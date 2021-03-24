import React from "react";
import { RuxButton } from "@astrouxds/rux-button";
import { NavLink } from "react-router-dom";
const Nav = (props) => {
  function logout(e) {
    localStorage.removeItem("token");
    console.log("Token Removed");
    props.history.push("/");
  }
  return (
    <div className="nav-container">
      <rux-button size="small" onClick={logout}>
        Logout
      </rux-button>
    </div>
  );
};

export default Nav;
