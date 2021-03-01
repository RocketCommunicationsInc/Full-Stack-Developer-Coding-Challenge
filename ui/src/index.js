import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = (
    <App />
);

ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);
