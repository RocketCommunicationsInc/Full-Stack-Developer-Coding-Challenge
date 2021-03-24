import React, { useState } from "react";
import LoginRegisterForm from "./components/LoginRegisterForm";
import { RuxButton } from "@astrouxds/rux-button";

import axios from "axios";
import { Link } from "react-router-dom";

const LoginRegister = (props) => {
  const [userName, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [token, setToken] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function clearInputs() {
    setUsername("");
    setPassword("");
  }

  function handleRegisterSubmit(e) {
    e.preventDefault();
    setIsLoggingIn(true);

    const creds = {
      username: userName,
      password: password,
    };
    axios
      //   .post("http://127.0.0.1:5000/register", creds)
      .post("https://evening-falls-37216.herokuapp.com/register", creds)

      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        props.history.push("/dash");
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
    setIsLoggingIn(false);
    clearInputs();
  }
  function handleLoginSubmit(e) {
    e.preventDefault();
    setIsLoggingIn(true);
    console.log("inside handleReg");
    const creds = { username: userName, password: password };
    axios
      //   .post("http://127.0.0.1:5000/login", creds)
      .post("https://evening-falls-37216.herokuapp.com/register", creds)
      .then((res) => {
        setIsLoggingIn(false);
        localStorage.setItem("token", res.data.token);
        props.history.push("/dash");
      })
      .catch((err) => {
        console.log(err.message);
        setError(err);
        setIsLoggingIn(false);
      });
    setIsLoggingIn(false);
    clearInputs();
  }

  return (
    <div className="login-register-wrapper">
      {props.loginRegister === "register" ? (
        <form onSubmit={handleRegisterSubmit}>
          <label>
            Username
            <input
              type="text"
              value={userName}
              name="username"
              onChange={handleUsernameChange}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              onChange={handlePasswordChange}
            />
          </label>
          {error != "" && (
            <div className="error-div">Please enter username and password.</div>
          )}
          <div className="button">
            <rux-button
              size="large"
              type="submit"
              onClick={handleRegisterSubmit}
            >
              Register Now!
            </rux-button>
          </div>
          <div className="already">
            <p>
              Already registered? Login <Link to="/login">Here!</Link>
            </p>
          </div>
        </form>
      ) : (
        <form onSubmit={handleLoginSubmit}>
          <label>
            Username
            <input
              type="text"
              value={userName}
              name="username"
              onChange={handleUsernameChange}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>

          {error != "" && (
            <div className="error-div">
              Username and/or password incorrect/missing.
            </div>
          )}
          <div className="button">
            <rux-button size="large" type="submit" onClick={handleLoginSubmit}>
              Login!
            </rux-button>
          </div>
          <div className="already">
            <p>
              Haven't registered? Sign up <Link to="/register">Here!</Link>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginRegister;
