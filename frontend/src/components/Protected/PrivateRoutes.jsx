/** @format */

import React from "react";
import { connect } from "react-redux";
import Spinner from "../Utils/Spinner";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  auth: { userLoading, isAuthenticated },
  ...rest
}) => (
  <Route
    render={(props) => {
      if (userLoading && !isAuthenticated) {
        return (
          <div
            style={{
              height: "78vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spinner />
          </div>
        );
      } else if (!userLoading && !isAuthenticated) {
        return <Redirect to="/" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
