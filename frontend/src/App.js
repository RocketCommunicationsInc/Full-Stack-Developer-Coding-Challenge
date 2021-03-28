import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { RuxButton } from '@astrouxds/rux-button/rux-button.js';


import AccountForm from './components/AccountForm';
import SignupSignin from './components/SignupSignin';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

import logo from './logo.svg';
import './App.css';

import * as api from './utils/api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [alerts, setAlerts] = React.useState([]);
  const [contacts, setContacts] = React.useState([]);

  const history = useHistory();

  function handleLoggedIn() {
    setIsLoggedIn(true);
  }

  function handleSignUp(username, password) {
    api.signUp(username, password).then((user) => {
      if (user) {
        setIsLoggedIn(true);
      }
    });
  }

  function handleSignIn(username, password) {
    api.signIn(username, password).then((data) => {
      if (data) {
        setIsLoggedIn(true);
      }
    });
  }

  function handleGetAlerts(token) {
    api.getAlerts(token).then((data) => {
      setAlerts(data);
    });
  }

  function handleGetContacts(token) {
    api.getContacts(token).then((data) => {
      setContacts(data);
    });
  }

  React.useEffect(() => {
    let token;
    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token');
    }
    if (isLoggedIn && token) {
      handleGetAlerts(token);
      handleGetContacts(token);
      history.push('/dashboard');
    }
  }, [isLoggedIn]);

  return (
    <div className='App'>
      <Switch>
        <ProtectedRoute
          path='/dashboard'
          component={Dashboard}
          isLoggedIn={isLoggedIn}
          alerts={alerts}
          contacts={contacts}
        />

        <Route path='/signin'>
          <SignupSignin title='Sign In' onSubmit={handleSignIn} />
        </Route>

        <Route path='/signup'>
          <SignupSignin title='Sign Up' onSubmit={handleSignUp}>
            <label>Confirm Password</label>
            <input type='password' />
          </SignupSignin>
        </Route>

        <Route path='/'>
          {isLoggedIn ? (
            <Redirect to='/dashboard' />
          ) : (
            <Redirect to='/signin' />
          )}
        </Route>

        <Route path='*'>
          <Redirect to='/signin' />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
