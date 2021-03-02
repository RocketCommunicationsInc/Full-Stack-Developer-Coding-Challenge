import React from 'react';
import Router from './router';
import axios from 'axios';
import {AuthContextProvider} from './components/authContext';

axios.defaults.withCredentials = true;

function App() {
  return <AuthContextProvider>
    <Router/>
  </AuthContextProvider>
}

export default App;