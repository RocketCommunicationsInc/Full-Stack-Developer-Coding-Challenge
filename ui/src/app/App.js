import React, { createContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthenticatorRoute from '../authentication/AuthenticatorRoute';
import { authContext } from '../hooks/useAuth';
import useProvideAuth from '../hooks/useProvideAuth';
import Dashboard from '../components/dashboard/Dashboard';
import LogonForm from '../components/logon/LogonForm';
import RegisterForm from '../components/logon/RegisterForm';

const App = () => {
  return (
    <ProvideAuth>
      <Router>

        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/login">
            <LogonForm />
          </Route>
          <Route path="/register">
            <RegisterForm />
          </Route>
        </Switch>

      </Router>
    </ProvideAuth>
  );
};

const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
};

export default App;