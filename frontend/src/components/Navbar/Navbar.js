/** @format */

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { FaTimes, FaBars } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { LargeRuxButton } from "../../GlobalStyles/globalStyles";
import "../../GlobalStyles/button.css";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavIcon,
  MobileIcon,
  NavMenu,
  NavItemBtn,
} from "./Navbar.elements";

const Navbar = ({ logout }) => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  const authLinks = (
    <li>
      <a
        style={{ textDecoration: "none", color: "#fff" }}
        onClick={logout}
        href="#!"
      >
        Logout
      </a>
    </li>
  );

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/" onClick={closeMobileMenu}>
            <NavIcon /> GRM Dashboard
          </NavLogo>
          <MobileIcon onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </MobileIcon>
          <NavMenu onClick={handleClick} click={click}>
            <NavItemBtn>
              {button ? (
                <LargeRuxButton className="rux-button">
                  {authLinks}
                </LargeRuxButton>
              ) : (
                <LargeRuxButton className="rux-button">
                  {authLinks}
                </LargeRuxButton>
              )}
            </NavItemBtn>
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </IconContext.Provider>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
