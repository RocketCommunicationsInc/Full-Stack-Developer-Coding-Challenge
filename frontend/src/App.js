import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { RuxButton } from '@astrouxds/rux-button/rux-button.js';

import AccountForm from './components/AccountForm';
import SignupSignin from './components/SignupSignin';
import Dashboard from './components/Dashboard';

import logo from './logo.svg';
import './App.css';

import * as api from './utils/api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleSignUp = (username, password) => {
    api.signUp(username, password).then((user) => {
      if (user) {
        setIsLoggedIn(true);
        return;
      }
    });
  };

  const handleSignIn = (username, password) => {
    api.signIn(username, password).then((data) => {
      if (data.token) {
        setIsLoggedIn(true);
        return;
      }
    });
  };

  return (
    <div className='App'>
      <Switch>
        <Route path='/signin'>
          <SignupSignin title='Sign In' onSubmit={handleSignIn} />
        </Route>

        <Route path='/signup'>
          <SignupSignin title='Sign Up' onSubmit={handleSignUp}>
            <label>Confirm Password</label>
            <input type='password' />
          </SignupSignin>
        </Route>

        <Route path='/dashboard'>
          <Dashboard />
        </Route>

        {/* <Route exact path='/'>
          {isLoggedIn ? <Redirect to='/dashboard' /> : }
        </Route> */}

        <Route path='*'>
          <Redirect to='/signin' />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
