import React from 'react';
import Table from './Table';
import { RuxButton } from '@astrouxds/rux-button/rux-button.js';

import './Dashboard.css';

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
    <div className='dashboard-container'>
      <rux-button
        class='rux-button--buttonBackgroundColor sign-out-button'
        size='large'
        onClick={props.onSignOut}
      >
        Sign out
      </rux-button>

      <div className='dashboard-pane-container'>
        <div className='dashboard__pane dashboard__pane_alerts'>
          <Table title='Alerts' data={props.alerts} columns={alertsColumns} />
        </div>

        <div className='dashboard__pane dashboard__pane_contacts'>
          <Table
            title='Contacts'
            data={props.contacts}
            columns={contactsColumns}
          />
        </div>
      </div>
      <p className='dashboard__contacts-count'>
        Total contacts: {props.contacts.length}
      </p>
    </div>
  );
}

export default Dashboard;
