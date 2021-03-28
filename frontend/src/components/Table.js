import React from 'react';
import MatertialTable from 'material-table';

function Table(props) {
  const [selectedRow, setSelectedRow] = React.useState(null);

  return (
    <div>
      <MatertialTable
        title={props.title}
        data={props.data}
        columns={props.columns}
        // onRowClick={(evt, selectedRow) =>
        //   setSelectedRow(selectedRow.tableData.id)
        // }
        options={{
          search: false,
          paging: false,
          maxBodyHeight: '750px',
          headerStyle: {
            fontWeight: 'bold',
            backgroundColor: 'var(--colorPrimary)',
            color: 'white'
          },
          draggable: false

          // rowStyle: (rowData) => ({
          //   backgroundColor:
          //     selectedRow === rowData.tableData.id ? '#EEE' : '#FFF'
          // })
        }}
      />
    </div>
  );
}

export default Table;
