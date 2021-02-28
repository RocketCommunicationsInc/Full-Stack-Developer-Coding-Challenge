import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";

const AuthenticatorRoute = ({ children, ...props }) => {
  const auth = useAuth();

  return (
    <Route
      {...props}
      render={({ location }) =>
        auth.session ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default AuthenticatorRoute;