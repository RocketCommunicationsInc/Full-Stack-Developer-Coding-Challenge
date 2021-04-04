import React from "react";
/* eslint-disable no-unused-vars */
import { RuxGlobalStatusBar } from "@astrouxds/rux-global-status-bar/rux-global-status-bar.js";
import { RuxClock } from "@astrouxds/rux-clock/rux-clock.js";
/* eslint-enable no-unused-vars */

function NavBar() {
  return (
    <div>
      <i>App Switch Menu Placeholder</i>
      <rux-global-status-bar
        class="dark-theme"
        appname="Sample GRM Dashboard"
        version="3.0"
      >
        <rux-clock></rux-clock>
      </rux-global-status-bar>
    </div>
  );
}

export default NavBar;
