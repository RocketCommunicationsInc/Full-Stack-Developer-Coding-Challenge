import React from "react";
import "./App.css";
import { Route, withRouter } from "react-router-dom";

import Auth from "./Components/Auth";
import NavBar from "./Components/NavBar"
import Dashboard from "./Components/Dashboard"

function App(props) {
  const {
    history
  } = props

  return (
    <div className="App dark-theme">
      <NavBar history={history} />
      <Route exact path="/" render={props => <Auth {...props} auth="login" />} />
      <Route path="/login" render={props => <Auth {...props} auth="login" />} />
      <Route path='/signup' render={props => <Auth {...props} auth="signup" />} />
      <Route path='/dashboard' render={props => <Dashboard {...props} />} />
    </div>
  );
}

export default withRouter(App);
