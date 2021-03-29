const path = require("path");

exports.LOCAL_OUT_DIR = path.join(process.cwd(), ".netlify", "edge-handlers");
exports.MANIFEST_FILE = "manifest.json";
exports.MAIN_FILE = "__netlifyMain.ts";
exports.CONTENT_TYPE = "application/javascript";
exports.API_HOST = "api.netlify.com";
