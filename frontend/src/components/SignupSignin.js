import React from 'react';
import AccountForm from './AccountForm';
import './Login.css';

function SignupSignin(props) {
  return (
    <div className='login-container'>
      <AccountForm title={props.title} submitButtonText={props.title} onSubmit={props.onSubmit}>
        <label>Username</label>
        <input type='text' />

        <label>Password</label>
        <input type='password' />

        {props.children}
      </AccountForm>
    </div>
  );
}

export default SignupSignin;
