import React from "react";
import { ProvideAuth } from "./hooks/useAuthContext"
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm"
import LoggedOut from "./components/LoggedOut"
import PrivateRoute from "./PrivateRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
    <Router>
      <ProvideAuth>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Route path="/signup" component={SignUpForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={LoggedOut} />
          </Switch>
      </ProvideAuth>
    </Router>
    </div>
  );
}

export default App;
