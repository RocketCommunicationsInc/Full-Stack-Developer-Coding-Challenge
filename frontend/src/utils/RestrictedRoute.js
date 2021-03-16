import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../constants/constants';
function RestrictedRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          localStorage.getItem(ACCESS_TOKEN_NAME) ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

export default RestrictedRoute;