// Library Imports
import axios from 'axios';
import React, { useState } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { RuxButton } from '@astrouxds/rux-button/rux-button.js';

// Local Imports
import Loading from './Loading';

const SignUpForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const authRequest = (props.formType === 'login') ? ('/api/session') : ('/api/users');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username, password };
    axios.post(authRequest, { user })
      .then(res => {
        props.setCurrentUser(res.data);
        setUsername("");
        setPassword("");
        props.history.push('/dashboard');
      })
      .catch(err => {
        let newErrors = err.response.data;
        setErrors(newErrors);
      });
  } 

  const errorsList = errors.length < 1 ? null : (
    <ul className="auth-form-errors-list">
      {errors.map((error, i) => (
        <li key={i} className="auth-form-error">{error}</li>
      ))}
    </ul>
  )

  return (
    <div className="rux-form-field auth-form">
      <form>
        <div className="auth-form-title">
          <h3>Welcome to Rocket App!</h3> 
        </div>
        {errorsList}
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          className="rux-input"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          placeholder="Username"
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="rux-input"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
        <div className="auth-form-btns">
          <rux-button onClick={handleSubmit}size="large">{(props.formType === 'login') ? ('Login') : ('Register')}</rux-button>
          {(props.formType === 'login') ? 
            (<p>Don't have an account? <Link to="/register">Register here!</Link></p>) : 
            (<p>Already have an account? <Link to="/">Login here!</Link></p>)}
        </div>
      </form>
    </div>
  )
}

export default withRouter(SignUpForm);