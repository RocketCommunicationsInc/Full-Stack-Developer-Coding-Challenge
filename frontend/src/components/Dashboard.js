import React from 'react';
import Table from './Table';
import { RuxButton } from '@astrouxds/rux-button/rux-button.js';

function Dashboard(props) {
  const alertsColumns = [
    { title: 'Error Category', field: 'errorCategory' },
    { title: 'Error Message', field: 'errorMessage' },
    { title: 'Error Time', field: 'errorTime' }
  ];

  const contactsColumns = [
    { title: 'Contact Name', field: 'contactName' },
    { title: 'Contact Status', field: 'contactStatus' },
    { title: 'Contact Begin Timestamp', field: 'contactBeginTimestamp' },
    { title: 'Contact End Timestamp', field: 'contactEndTimestamp' }
  ];

  return (
    <div>
      <rux-button
        class='rux-button--buttonBackgroundColor account-form__submit'
        size='large'
        onClick={props.onSignOut}
      >
        Sign out
      </rux-button>
      <Table title='Alerts' data={props.alerts} columns={alertsColumns} />
      <Table title='Contacts' data={props.contacts} columns={contactsColumns} />
    </div>
  );
}

export default Dashboard;
