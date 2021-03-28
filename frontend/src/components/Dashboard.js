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
      <div className='dashboard__pane-container'>
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

      <div className='dashboard__counts-total-container'>
        <div className='dashboard__count dashboard__count_contacts'>
          <p>
            <strong>Total contacts:</strong>
          </p>
          <p>{props.contacts.length}</p>
        </div>
        <div className='dashboard__count dashboard__count_contacts-states'>
          <p>
            <strong>Contact states ({props.contactStates.length}):</strong>
          </p>
          <p>{props.contactStates.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
