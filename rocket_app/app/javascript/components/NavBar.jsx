// Library Imports
import * as React from "react";

// Local Imports
import { RuxGlobalStatusBar } from '@astrouxds/rux-global-status-bar/rux-global-status-bar.js';
import { RuxButton } from '@astrouxds/rux-button/rux-button.js';
import { RuxClock } from '@astrouxds/rux-clock/rux-clock.js';


const NavBar = (props) => {

  const { currentUser, logout } = props;

  const logoutBtn = (!!currentUser || currentUser.id === null) ? (<div></div>) : (
    <rux-button onClick={logout}>Logout</rux-button>
  )

  return (
    <rux-global-status-bar class="dark-theme nav-bar-header" appname="Rocket App">
      <rux-clock timezone="America/New_York" />
      {logoutBtn}
    </rux-global-status-bar>
  )
}

export default NavBar;