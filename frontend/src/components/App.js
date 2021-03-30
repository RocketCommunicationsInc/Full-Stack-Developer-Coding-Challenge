import React from 'react';
import moment from 'moment';

import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import Header from './Header';
import SignupSignin from './SignupSignin';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';

import './App.css';

import * as api from '../utils/api';

function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [alerts, setAlerts] = React.useState([]);
  const [contacts, setContacts] = React.useState([]);
  const [contactStates, setContactStates] = React.useState([]);

  const history = useHistory();

  function userHasSignedIn() {
    setIsLoggedIn(true);
    history.push('/dashboard');
  }

  function handleSignUp(username, password) {
    api
      .signUp(username, password)
      .then((user) => {
        if (user) {
          userHasSignedIn();
        }
      })
      .catch((err) => {
        console.log('Failed to create user');
      });
  }

  function handleSignIn(username, password) {
    api
      .signIn(username, password)
      .then((data) => {
        if (data) {
          userHasSignedIn();
        }
      })
      .catch((err) => {
        console.log('Failed to sign in', err);
      });
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    history.push('/');
  }

  function handleGetAlerts(token) {
    api
      .getAlerts(token)
      .then((data) => {
        data?.forEach((alert) => {
          let formattedTime = moment(alert.errorTime).format(
            'ddd, MMM Do YYYY, h:mm:ss a'
          );
          alert.errorTime = formattedTime;
        });

        setAlerts(data);
      })
      .catch((err) => {
        console.log('Failed to get alerts', err);
      });
  }

  function handleGetContacts(token) {
    api
      .getContacts(token)
      .then((data) => {
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
      })
      .catch((err) => {
        console.log('Failed to get contacts', err);
      });
  }

  function checkToken() {
    if (localStorage.getItem('token')) {
      userHasSignedIn();
    }
  }

  function handleThemeSelection() {
    setIsDarkMode(!isDarkMode);
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
      console.log(
        'getting alerts and contacts after logging in and received token'
      );
      handleGetAlerts(token);
      handleGetContacts(token);
    }
  }, [isLoggedIn]);

  return (
    <div className={`App ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <Header
        isDarkMode={isDarkMode}
        onSignOut={handleSignOut}
        onThemeSelect={handleThemeSelection}
      />
      <Switch>
        <ProtectedRoute
          path='/dashboard'
          component={Dashboard}
          isLoggedIn={isLoggedIn}
          alerts={alerts}
          contacts={contacts}
          contactStates={contactStates}
          isDarkMode={isDarkMode}
        />

        <Route path='/signin'>
          <SignupSignin
            isDarkMode={isDarkMode}
            title='Sign In'
            onSubmit={handleSignIn}
            linkPath='/signup'
            altText='Sign Up'
          />
        </Route>

        <Route path='/signup'>
          <SignupSignin
            isDarkMode={isDarkMode}
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
      </Switch>
    </div>
  );
}

export default App;
