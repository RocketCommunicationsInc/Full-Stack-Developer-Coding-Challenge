import React from "react";
import { useAuth } from "../hooks/useAuthContext";
import AuthButtons from "./AuthButtons";
/* eslint-disable no-unused-vars */
import { RuxGlobalStatusBar } from "@astrouxds/rux-global-status-bar/rux-global-status-bar.js";
import { RuxClock } from "@astrouxds/rux-clock/rux-clock.js";
/* eslint-enable no-unused-vars */

function NavBar() {
  const { user } = useAuth();

  return (
    <div>
      <rux-global-status-bar
        class="dark-theme"
        appname="Sample GRM Dashboard"
        version="3.0"
      >
        {user ? <h3>{`Welcome ${user.name}`}</h3> : null}
        <rux-clock></rux-clock>
        <AuthButtons />
      </rux-global-status-bar>
    </div>
  );
}

export default NavBar;
