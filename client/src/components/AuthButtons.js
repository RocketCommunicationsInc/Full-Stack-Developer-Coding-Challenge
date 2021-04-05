import React from "react";
import { useAuth } from "../hooks/useAuthContext";

const AuthButtons = () => {
  const auth = useAuth();
  const { user } = auth;

  return (
    <div style={{ display: "flex", justifyContent: "end" }}>
      {!user ? (
        <>
          <a className="rux-button auth-button" href="/login">
            Log In
          </a>
          <a className="rux-button auth-button" href="/signup">
            Register
          </a>
        </>
      ) : (
        <a className="rux-button auth-button" href="/logout">
          Logout
        </a>
      )}
    </div>
  );
};

export default AuthButtons;
