import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import { StateProvider } from './context/store';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = (
  // <StateProvider>
    <App />
  // </StateProvider>
);

ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);
