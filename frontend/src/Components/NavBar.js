import React from "react";
import Proptypes from 'prop-types'
import { NavLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { RuxGlobalStatusBar } from '@astrouxds/rux-global-status-bar/rux-global-status-bar.js'

import { ReactComponent as AstroLogo } from "../static/img/astro-logo-small-dark.svg";

const NavBar = (props) => {
  const { history } = props;
  const token = localStorage.getItem("token");

  const logOut = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <rux-global-status-bar class="dark-theme">
      <Grid container direction="row" justify="space-between" alignItems="center" wrap="nowrap">
        <Grid item>
          <AstroLogo />
        </Grid>
        <Grid container item spacing={2} justify="flex-end" alignItems="center">
          {!token ? (
            <>
              <Grid item>
                <NavLink className="login" to="/login">
                  Login
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink className="signup" to="/signup">
                  Sign Up
                </NavLink>
              </Grid>
            </>
          ) : (
            <Grid item>
              <NavLink onClick={logOut}>Log Out</NavLink>
            </Grid>
          )}
        </Grid>
      </Grid>
    </rux-global-status-bar>
  );
};

export default NavBar

// NavBar.Proptypes = {
//     history: Proptypes.object.isRequired
// }