import React from 'react';
import MatertialTable from 'material-table';

function Table(props) {
  return (
    <div>
      <MatertialTable
        title={props.title}
        data={props.data}
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
