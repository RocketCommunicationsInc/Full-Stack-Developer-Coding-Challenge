import React from 'react';
import { RuxButton } from '@astrouxds/rux-button/rux-button.js';
import './AccountForm.css';

function AccountForm(props) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleUsernameInput(e) {
    setUsername(e.target.value);
  }

  function handlePasswordInput(e) {
    setPassword(e.target.value);
  }

  function handleSubmit() {
    props.onSubmit(username, password);
  }

  return (
    <form className='account-form'>
      <h2 className='account-form__title'>{props.title}</h2>
      <label>Username</label>
      <input type='text' onChange={handleUsernameInput} />

      <label>Password</label>
      <input type='password' onChange={handlePasswordInput} />

      {/* {props.children} */}

      <rux-button
        class='rux-button--buttonBackgroundColor account-form__submit'
        size='large'
        onClick={handleSubmit}
      >
        {props.submitButtonText}
      </rux-button>
    </form>
  );
}

export default AccountForm;
