import React from 'react';
import Table from './Table';

function Dashboard(props) {
  const columns = [
    { title: 'errorCategory', field: 'errorCategory' },
    { title: 'errorMessage', field: 'errorMessage' },
    { title: 'errorTime', field: 'errorTime' }
  ];

  return (
    <div>
      <h1>Hello world</h1>

      <Table alerts={props.alerts} columns={columns} />
    </div>
  );
}

export default Dashboard;
