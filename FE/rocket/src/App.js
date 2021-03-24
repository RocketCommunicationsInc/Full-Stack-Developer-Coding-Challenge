import logo from "./logo.svg";
import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import LoginRegister from "./LoginRegister";
import Dash from "./Dash";
import Nav from "./Nav";

function App() {
  const path = window.location.pathname;
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <LoginRegister {...props} loginRegister={"login"} />
          )}
        ></Route>
        <Route
          path="/login"
          render={(props) => (
            <LoginRegister {...props} loginRegister={"login"} />
          )}
        ></Route>
        <Route
          path="/register"
          render={(props) => (
            <LoginRegister {...props} loginRegister={"register"} />
          )}
        ></Route>
        <Route
          path="/dash"
          render={(props) => (
            <Dash {...props} token={localStorage.getItem("token")} />
          )}
        ></Route>
      </Switch>
    </div>
  );
}

export default App;
