import React from 'react';
import Router from './router';
import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {
  return <>
    <Router/>
  </>
}

export default App;