import React from "react";
import "./App.css";
import { Route, withRouter } from "react-router-dom";

import Login from "./Components/Login";
import Signup from "./Components/Signup";
import NavBar from "./Components/NavBar"

function App(props) {
  const {
    history
  } = props

  return (
    <div className="App dark-theme">
      <NavBar history={history} />
      <Route exact path="/" component={Login} />
      <Route
        path="/login"
        render={(props) => {
          <Login {...props} history={history} />
        }}
      />
      <Route path="/signup" component={Signup} />
    </div>
  );
}

export default withRouter(App);
