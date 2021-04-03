import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { BACKEND_HOST } from "../../constants";

export const LoginRegisterForm = (props) => {
  const {
    username,
    password,
    handleSetUsername,
    handleSetPassword,
    setDisplayLogin,
    formType,
  } = props;

  const history = useHistory();

  const [invalidUsername, setInvalidUsername] = useState(true);
  const [invalidPassword, setInvalidPassword] = useState(true);

  const validateUsername = () => {
    if (username && username.length > 0) {
      setInvalidUsername(false);
    } else {
      setInvalidUsername(true);
    }
  };

  const validatePassword = () => {
    if (password && password.length > 0) {
      setInvalidPassword(false);
    } else {
      setInvalidPassword(true);
    }
  };

  const handleLogin = async () => {
    validateUsername();
    validatePassword();
    if (!invalidUsername && !invalidPassword) {
      fetch(`${BACKEND_HOST}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error === true) {
            console.log(res.message);
          } else {
            handleSetUsername("");
            handleSetPassword("");
            history.push("/main");
          }
        });
    }
  };

  const handleRegister = () => {
    validateUsername();
    validatePassword();
    if (!invalidUsername && !invalidPassword) {
      fetch(`${BACKEND_HOST}/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
    }
    setDisplayLogin(true);
  };

  const handleBlur = (validate) => {
    return validate();
  };

  const renderForm = () => {
    switch (formType) {
      case "login":
        return loginForm();
      case "register":
        return registerForm();
    }
  };

  const loginForm = () => {
    return (
      <div className="rux-form-field">
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            WebkitTransform: "translate(-50%, -50%)",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div>
            <h1 style={{ margin: "0 0 15px 0" }}>Login</h1>
            <div className="rux-form-field__label">* Username</div>
            <input
              onChange={(e) => handleSetUsername(e.target.value)}
              onBlur={() => handleBlur(() => validateUsername())}
              style={{ margin: "0 0 15px 0" }}
              value={username}
            />
          </div>
          <div>
            <div className="rux-form-field__label">* Password</div>
            <input
              onChange={(e) => handleSetPassword(e.target.value)}
              onBlur={() => handleBlur(() => validatePassword())}
              style={{ margin: "0 0 15px 0" }}
              value={password}
            />
          </div>
          <button className="rux-button" onClick={() => handleLogin()}>
            Login
          </button>
          <div style={{ margin: "15px 0 0 0" }}>
            {"New user? Register "}
            <a
              onClick={() => setDisplayLogin(false)}
              style={{ cursor: "pointer" }}
            >
              here!
            </a>
          </div>
        </div>
      </div>
    );
  };

  const registerForm = () => {
    return (
      <div className="rux-form-field">
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            WebkitTransform: "translate(-50%, -50%)",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div>
            <h1 style={{ margin: "0 0 15px 0" }}>Register</h1>
            <div className="rux-form-field__label">* Username</div>
            <input
              onChange={(e) => handleSetUsername(e.target.value)}
              onBlur={() => handleBlur(() => validateUsername())}
              style={{ margin: "0 0 15px 0" }}
              value={username}
            />
          </div>
          <div>
            <div className="rux-form-field__label">* Password</div>
            <input
              onChange={(e) => handleSetPassword(e.target.value)}
              onBlur={() => handleBlur(() => validatePassword())}
              style={{ margin: "0 0 15px 0" }}
              value={password}
            />
          </div>
          <button className="rux-button" onClick={() => handleRegister()}>
            Register
          </button>
          <div style={{ margin: "15px 0 0 0" }}>
            {"Go "}
            <a
              onClick={() => setDisplayLogin(true)}
              style={{ cursor: "pointer" }}
            >
              Back
            </a>
            {" to Login"}
          </div>
        </div>
      </div>
    );
  };

  return <div>{renderForm()}</div>;
};
