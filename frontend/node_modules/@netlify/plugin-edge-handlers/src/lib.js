const crypto = require("crypto");
const { promises: fsPromises } = require("fs");
const os = require("os");
const path = require("path");
const process = require("process");

const nodeBabel = require("@rollup/plugin-babel");
const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
const nodeResolve = require("@rollup/plugin-node-resolve");
const del = require("del");
const makeDir = require("make-dir");
const rollup = require("rollup");
const nodePolyfills = require("rollup-plugin-node-polyfills");
const { terser } = require("rollup-plugin-terser");

const babel = nodeBabel.babel;
const resolve = nodeResolve.nodeResolve;

const { MANIFEST_FILE, MAIN_FILE, CONTENT_TYPE } = require("./consts");
const nodeGlobals = require("./node-compat/globals");
const uploadBundle = require("./upload");

function getShasum(buf) {
  const shasum = crypto.createHash("sha1");
  shasum.update(buf);
  return shasum.digest("hex");
}

/**
 * Generates an entrypoint for bundling the handlers
 * It also makes sure all handlers are registered with the runtime
 *
 * @param {string} EDGE_HANDLERS_SRC path to the edge handler directory
 * @returns {Promise<{ handlers: string[], mainFile: string }>} list of handlers and path to entrypoint
 */
async function assemble(EDGE_HANDLERS_SRC) {
  const entries = await fsPromises.readdir(EDGE_HANDLERS_SRC, { withFileTypes: true });
  const handlers = entries.filter(isHandlerFile).map(getFilename);

  if (handlers.length === 0) {
    return { handlers };
  }

  const mainContents = handlers
    .map(
      (handler, index) => `
import * as func${index} from "${unixify(path.resolve(EDGE_HANDLERS_SRC, handler))}";
netlifyRegistry.set("${handler}", func${index});`,
    )
    .join("\n");

  const tmpDir = await fsPromises.mkdtemp(path.join(os.tmpdir(), "handlers-")); //make temp dir `handlers-abc123`
  const mainFile = path.join(tmpDir, MAIN_FILE);
  await fsPromises.writeFile(mainFile, mainContents);
  return { handlers, mainFile };
}

// ES modules requires forward slashes
function unixify(filePath) {
  if (process.platform !== "win32") {
    return filePath;
  }

  return filePath.replace(UNIXIFY_REGEXP, "/");
}

const UNIXIFY_REGEXP = /\\/g;

function isHandlerFile(entry) {
  return path.extname(entry.name) === ".js" && entry.isFile();
}

function getFilename(entry) {
  return path.basename(entry.name, path.extname(entry.name));
}

/**
 * @type {import("@rollup/plugin-babel").RollupBabelInputPluginOptions}
 */
const babelConfig = {
  exclude: "node_modules/**",
  babelHelpers: "bundled",
  babelrc: false,
  configFile: false,
  presets: [
    [
      require("@babel/preset-env"),
      {
        targets: {
          chrome: "87", // latest beta release as of this commit (V8 8.6)
        },
      },
    ],
  ],
};

/**
 * Creates a new rollup config bundling the given file.
 *
 * @param {string} file The file to be bundled.
 * @param {*} onWarn Optional: A callback called on a rollup warning.
 */
const rollupConfig = (file, onWarn) => ({
  input: file,
  plugins: [
    babel(babelConfig),
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs(),
    json({
      compact: true,
    }),
    nodeGlobals(),
    nodePolyfills(),
    terser(),
  ],
  onwarn(msg, warn) {
    if (typeof onWarn === "function") {
      onWarn(msg, warn);
      return;
    }

    warn(msg);
  },
});

/**
 * Bundles the handler code based on a generated entrypoint
 *
 * @param {string} file path of the entrypoint file
 * @returns {Promise<string>} bundled code
 */
async function bundleFunctions(file, utils) {
  const options = rollupConfig(file, (msg, warn) => {
    if (msg.code == "UNRESOLVED_IMPORT") {
      utils.build.failBuild(
        `Error in ${msg.importer}, could not resolve ${msg.source} module. Please install this dependency locally and ensure it is listed in your package.json`,
      );
    } else {
      warn(msg);
    }
  });

  try {
    const bundle = await rollup.rollup(options);
    const {
      output: [{ code }],
    } = await bundle.generate({
      format: "iife",
      compact: true,
    });
    return code;
  } catch (error) {
    // This will stop the execution of this plugin.
    // No Edge Handlers will be uploaded.
    return utils.build.failBuild("Error while bundling Edge Handlers", { error });
  }
}

/**
 * Bundles the given edge handler module for use in the CLI.
 *
 * @param {string} file path of the entrypoint file
 * @returns {Promise<string>} bundled code
 */
function bundleFunctionsForCli(file) {
  return new Promise((res, rej) => {
    const options = rollupConfig(file, (msg, warn) => {
      if (msg.code == "UNRESOLVED_IMPORT") {
        rej({
          code: "unresolved-import",
          msg: `Error in ${msg.importer}, could not resolve ${msg.source} module. Please install this dependency locally and ensure it is listed in your package.json.`,
          importee: msg.source,
          importer: msg.importer,
          success: false,
        });
      } else {
        warn(msg);
      }
    });

    rollup
      .rollup(options)
      .then((bundle) =>
        bundle.generate({
          format: "iife",
          compact: true,
        }),
      )
      .then(({ output: [{ code }] }) => res(code))
      .catch((err) =>
        rej({
          code: "unknown",
          msg: `Error while bundling Edge Handlers: ${err.message}`,
          success: false,
        }),
      );
  });
}

/**
 * Writes out the bundled code to disk along with any meta info
 *
 * @param {string} bundle bundled code
 * @param {string[]} handlers names of the included handlers
 * @param {string} outputDir path to the output directory (created if not exists)
 * @param {boolean} isLocal whether we're running locally or in CI
 * @param {string | null} apiToken Netlify API token used for uploads
 * @returns {Promise<boolean>}
 */
async function publishBundle(bundle, handlers, outputDir, isLocal, apiToken) {
  // encode bundle into bytes
  const buf = Buffer.from(bundle, "utf-8");
  const sha = getShasum(buf);

  /** @type {import("./upload").BundleInfo} */
  const bundleInfo = {
    sha,
    handlers,
    // needs to have length of the byte representation, not the string length
    content_length: buf.length,
    content_type: CONTENT_TYPE,
  };

  if (isLocal) {
    // cleanup previous handlers
    await del(outputDir);

    await makeDir(outputDir);

    // bundled handlers
    const outputFile = path.join(outputDir, bundleInfo.sha);
    await fsPromises.writeFile(outputFile, bundle, "utf-8");

    // manifest
    const manifestFile = path.join(outputDir, MANIFEST_FILE);
    await fsPromises.writeFile(manifestFile, JSON.stringify(bundleInfo, null, 2));
  } else {
    const uploaded = await uploadBundle(buf, bundleInfo, process.env.DEPLOY_ID, apiToken);
    if (!uploaded) {
      console.log("Bundle already exists. Skipping upload...");
    }
    return uploaded;
  }

  return false;
}

function logHandlers(handlers, EDGE_HANDLERS_SRC) {
  const handlersString = handlers.map(serializeHandler).join("\n");
  console.log(`Packaging Edge Handlers from ${EDGE_HANDLERS_SRC} directory:\n${handlersString}`);
}

function serializeHandler(handler) {
  return ` - ${handler}`;
}

module.exports = {
  assemble,
  bundleFunctions,
  bundleFunctionsForCli,
  logHandlers,
  publishBundle,
  rollupConfig,
};
