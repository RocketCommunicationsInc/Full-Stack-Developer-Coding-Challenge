import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...props }) {
  return (
    <Route>
      {props.isLoggedIn ? <Component {...props} /> : ""}
    </Route>
  );
}

export default ProtectedRoute;
