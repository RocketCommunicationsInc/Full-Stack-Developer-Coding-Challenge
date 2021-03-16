import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Dashboard from './components/Dashboard/Dashboard';
import RestrictedRoute from './utils/RestrictedRoute';
import Alert from './components/Alert/Alert';  

function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    <Router>
    <div className="App">
      <Header title={title}/>
        <div className="d-flex align-items-center flex-column">
          <Switch>
            <Route path="/" exact={true}>
              <Login showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <Route path="/register">
              <Registration showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <Route path="/login">
              <Login showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <RestrictedRoute path="/dashboard">
              <Dashboard/>
            </RestrictedRoute>
          </Switch>
          <Alert errorMessage={errorMessage} hideError={updateErrorMessage}/>
        </div>
    </div>
    </Router>
  );
}

export default App;
