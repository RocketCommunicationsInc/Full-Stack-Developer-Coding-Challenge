import React, { useState } from "react";
import { RuxButton } from "@astrouxds/rux-button";

const LoginRegisterForm = (props) => {
  return (
    <div className="login-register-form">
      <form className="rux-form-field">
        <div className="inputs-wrapper">
          <label>
            Username
            <input
              className="input"
              name="username"
              type="text"
              value="Username"
            />
          </label>
          <label>
            Password
            <input name="password" type="password" />
          </label>
        </div>
        {props.loginRegister === "register" ? (
          <rux-button size="large">Register</rux-button>
        ) : (
          <rux-button size="large">Login</rux-button>
        )}
      </form>
    </div>
  );
};

export default LoginRegisterForm;
