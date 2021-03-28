import React from 'react';
import moment from 'moment';

import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { RuxButton } from '@astrouxds/rux-button/rux-button.js';

import AccountForm from './components/AccountForm';
import Header from './components/Header';
import SignupSignin from './components/SignupSignin';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

import logo from './logo.svg';
import './App.css';

import * as api from './utils/api';

function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [alerts, setAlerts] = React.useState([]);
  const [contacts, setContacts] = React.useState([]);
  const [contactStates, setContactStates] = React.useState([]);

  const history = useHistory();

  function handleSignUp(username, password) {
    api.signUp(username, password).then((user) => {
      if (user) {
        setIsLoggedIn(true);
        history.push('/dashboard');
      }
    });
  }

  function handleSignIn(username, password) {
    api.signIn(username, password).then((data) => {
      setIsLoggedIn(true);
      history.push('/dashboard');
    });
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    history.push('/');
  }

  function handleGetAlerts(token) {
    api.getAlerts(token).then((data) => {
      data?.forEach((alert) => {
        let formattedTime = moment(alert.errorTime).format(
          'ddd, MMM Do YYYY, h:mm:ss a'
        );
        alert.errorTime = formattedTime;
      });

      setAlerts(data);
    });
  }

  function handleGetContacts(token) {
    api.getContacts(token).then((data) => {
      let states = [];

      data?.forEach((contact) => {
        let formattedBegin = moment(contact.contactBeginTimestamp).format(
          'ddd, MMM Do YYYY, h:mm:ss a'
        );
        let formattedEnd = moment(contact.contactEndTimestamp).format(
          'ddd, MMM Do YYYY, h:mm:ss a'
        );
        contact.contactBeginTimestamp = formattedBegin;
        contact.contactEndTimestamp = formattedEnd;

        if (!states.includes(contact.contactState)) {
          states.push(contact.contactState);
        }
      });

      setContacts(data);
      setContactStates(states);
    });
  }

  function checkToken() {
    let token;
    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token');
      setIsLoggedIn(true);
      history.push('/dashboard');
    }
  }

  React.useEffect(() => {
    checkToken();
  }, []);

  React.useEffect(() => {
    let token;
    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token');
    }
    if (isLoggedIn && token) {
      handleGetAlerts(token);
      handleGetContacts(token);
    }
  }, [isLoggedIn]);

  return (
    <div className={`App ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <Header onSignOut={handleSignOut} />
      <Switch>
        <ProtectedRoute
          path='/dashboard'
          component={Dashboard}
          isLoggedIn={isLoggedIn}
          alerts={alerts}
          contacts={contacts}
          contactStates={contactStates}
        />

        <Route path='/signin'>
          <SignupSignin
            title='Sign In'
            onSubmit={handleSignIn}
            linkPath='/signup'
            altText='Sign Up'
          />
        </Route>

        <Route path='/signup'>
          <SignupSignin
            title='Sign Up'
            onSubmit={handleSignUp}
            linkPath='/signin'
            altText='Sign In'
          />
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
