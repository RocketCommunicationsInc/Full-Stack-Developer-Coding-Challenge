import React from 'react';
import AccountForm from './AccountForm';
import './SignupSignin.css';

function SignupSignin(props) {
  return (
    <div className='signup-signin-container'>
      <AccountForm
        title={props.title}
        submitButtonText={props.title}
        onSubmit={props.onSubmit}
      >
        <p>
          <a className="account-form__alt-text" href={props.linkPath}>Click here to {props.altText}</a>
        </p>
      </AccountForm>
    </div>
  );
}

export default SignupSignin;
