/** @format */

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Activate from "./containers/Activate";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import PrivateRoute from "./components/Protected/PrivateRoutes";
import Dashboard from "./components/Protected/Dashboard/Dashboard";
import { Provider } from "react-redux";
import store from "./store";
import Layout from "../src/hoc/Layout";
// eslint-disable-next-line
import { RuxButton } from "@astrouxds/rux-button/rux-button.js";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/reset_password" component={ResetPassword} />
            <Route
              exact
              path="/password/reset/confirm/:uid/:token"
              component={ResetPasswordConfirm}
            />
            <Route exact path="/activate/:uid/:token" component={Activate} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
