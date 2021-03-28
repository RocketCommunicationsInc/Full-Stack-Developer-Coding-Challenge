import React from 'react';
import Table from './Table';

function Dashboard(props) {
  const alertsColumns = [
    { title: 'errorCategory', field: 'errorCategory' },
    { title: 'errorMessage', field: 'errorMessage' },
    { title: 'errorTime', field: 'errorTime' }
  ];

  const contactsColumns =[
    { title: 'contactName', field: 'contactName' },
    { title: 'contactStatus', field: 'contactStatus' },
    { title: 'contactBeginTimestamp', field: 'contactBeginTimestamp' },
    { title: 'contactEndTimestamp', field: 'contactEndTimestamp' },

  ]

  return (
    <div>

      <Table title="Alerts" data={props.alerts} columns={alertsColumns} />
      <Table title="Contacts" data={props.contacts} columns={contactsColumns} />

    </div>
  );
}

export default Dashboard;
