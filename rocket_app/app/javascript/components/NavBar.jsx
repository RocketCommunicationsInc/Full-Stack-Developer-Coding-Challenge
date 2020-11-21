// Local Imports
import * as React from "react";

import { RuxGlobalStatusBar } from '@astrouxds/rux-global-status-bar/rux-global-status-bar.js';

const NavBar = () => {
  return (
    <rux-global-status-bar class="dark-theme" appname="Rocket App" version="3.0">
      {/* <rux-clock></rux-clock>
      <div><!-- Any HTML here --></div>
      <rux-button>Master Off</rux-button> */}
    </rux-global-status-bar>
  )
}

export default NavBar;