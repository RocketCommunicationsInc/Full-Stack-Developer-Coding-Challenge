// Imported Packages
import React from 'react';
import {BroswerRouter as Router, Route, Link} from 'react-router-dom';
//Imported Files
import './App.css';
import login from './components/pages/login';
import register from './components/pages/register';
import main from './components/pages/main';

function App() {
  return(
    <div>
      <Route exact path="/" component={login} />
      <Route exact path="/register" component={register} />
      <Route exact path="/main" component={main} />
    </div>
  )
}

export default App;