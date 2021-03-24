import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import LoginRegister from "./LoginRegister";
import Dash from "./Dash";

function App() {
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
