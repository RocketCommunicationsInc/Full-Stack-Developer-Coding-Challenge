import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthenticatorRoute from '../authentication/AuthenticatorRoute';
import { authContext } from '../hooks/useAuth';
import useProvideAuth from '../hooks/useProvideAuth';
import Dashboard from '../components/dashboard/Dashboard';
import LogonForm from '../components/logon/LogonForm';
import RegisterForm from '../components/logon/RegisterForm';

const App = () => {
  return (
    <div style={{backgroundColor:"#1A2838"}}>
    <ProvideAuth>
      <Router>
        <Switch>
          <AuthenticatorRoute exact path="/">
            <Dashboard />
          </AuthenticatorRoute>

          <Route path="/login">
            {props => 
            <authContext.Consumer>
              {(value) => 
              <LogonForm 
                authenticate={value.authenticate}
                {...props} 
              />}
            </authContext.Consumer>
            }
          </Route>
          <Route path="/register">
            <RegisterForm />
          </Route>
        </Switch>
      </Router>
    </ProvideAuth>
    </div>
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