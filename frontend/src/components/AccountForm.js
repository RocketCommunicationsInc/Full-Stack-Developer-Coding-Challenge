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
    <div className='account-form-container'>
      <div className='account-form__underlay'></div>
      <form
        className={`account-form ${
          props.isDarkMode ? 'account-form_dark_theme' : ''
        }`}
        onSubmit={handleSubmit}
      >
        <h2 className='account-form__title'>{props.title}</h2>
        <label className={`account-form__input-label `}>Username</label>
        <input
          id='input__username'
          className='rux-input account-form__input account-form__input_username'
          type='text'
          required
          placeholder='Enter Username'
          onChange={handleUsernameInput}
        />

        <label className={`account-form__input-label `}>Password</label>
        <input
          id='input__password'
          className='rux-input account-form__input account-form__input_password'
          type='password'
          required
          placeholder='Enter Password'
          onChange={handlePasswordInput}
        />

        {props.children}

        <rux-button
          class='account-form__submit'
          size='large'
          onClick={handleSubmit}
        >
          {props.submitButtonText}
        </rux-button>
      </form>
    </div>
  );
}

export default AccountForm;
