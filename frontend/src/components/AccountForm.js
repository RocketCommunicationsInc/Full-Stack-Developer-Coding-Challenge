import React from 'react';
import { RuxButton } from '@astrouxds/rux-button/rux-button.js';
import './AccountForm.css';

function AccountForm(props) {
  const handleSubmit = () => {
    props.onSubmit();
  };

  return (
    <form className='account-form'>
      <h2 className='account-form__title'>{props.title}</h2>
      {props.children}
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
