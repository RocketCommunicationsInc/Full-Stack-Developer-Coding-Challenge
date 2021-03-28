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

  React.useEffect(() => {
    console.log('isLoggedIn status', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div className='App'>
        {/* {isLoggedIn ? <Redirect to='/dashboard' /> : <Redirect to='/signin' />} */}
      <Switch>

        <Route path='/dashboard'>
          <Dashboard />
        </Route>
      <Route path='/signin'>
        <SignupSignin title='Sign In' onSubmit={handleSignIn} />
      </Route>

      <Route path='/signup'>
        <SignupSignin title='Sign Up' onSubmit={handleSignUp}>
          <label>Confirm Password</label>
          <input type='password' />
        </SignupSignin>
      </Route>

      <Route path='*'>
        <Redirect to='/signin' />
      </Route>

      </Switch>

    </div>
  );
}

export default App;
