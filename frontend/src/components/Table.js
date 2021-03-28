import React from 'react';
import MatertialTable from 'material-table';

function Table(props) {
  const data = [
    { name: 'John', email: 'john@gmail.com', age: 12, gender: 'Male' },
    { name: 'Bren', email: 'bren@gmail.com', age: 24, gender: 'Male' },
    { name: 'Marry', email: 'marry@gmail.com', age: 18, gender: 'Female' },
    { name: 'Shohail', email: 'shohail@gmail.com', age: 25, gender: 'Male' },
    { name: 'Aseka', email: 'aseka@gmail.com', age: 19, gender: 'Female' },
    { name: 'Meuko', email: 'meuko@gmail.com', age: 12, gender: 'Female' }
  ];

  return (
    <div>
      <MatertialTable
        title='Alerts'
        data={props.alerts}
        columns={props.columns}
        options={{
          search: false,
          paging: false
        }}
      />
    </div>
  );
}

export default Table;
