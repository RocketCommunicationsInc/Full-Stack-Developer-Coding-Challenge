import React from "react";
import { RuxGlobalStatusBar } from "@astrouxds/rux-global-status-bar/rux-global-status-bar.js";
import { RuxClock } from "@astrouxds/rux-clock/rux-clock.js";

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
