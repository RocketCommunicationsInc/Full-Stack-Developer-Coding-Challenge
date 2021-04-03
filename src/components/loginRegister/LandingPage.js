import React, { useState } from "react";
import { LoginRegisterForm } from "./LoginRegisterForm";
import "../../astroCss/css/astro.css";

export const LandingPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayLogin, setDisplayLogin] = useState(true);

  const handleSetUsername = (e) => {
    setUsername(e);
  };

  const handleSetPassword = (e) => {
    setPassword(e);
  };

  const renderPage = () => {
    return (
      <div>
        {displayLogin ? (
          <LoginRegisterForm
            username={username}
            password={password}
            handleSetUsername={handleSetUsername}
            handleSetPassword={handleSetPassword}
            setDisplayLogin={setDisplayLogin}
            formType="login"
          />
        ) : (
          <LoginRegisterForm
            username={username}
            password={password}
            handleSetUsername={handleSetUsername}
            handleSetPassword={handleSetPassword}
            setDisplayLogin={setDisplayLogin}
            formType="register"
          />
        )}
      </div>
    );
  };

  return <div>{renderPage()}</div>;
};
