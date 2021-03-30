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
          paging: false,
          maxBodyHeight: '750px',
          backgroundColor: 'var(--colorPrimaryDarken2)',
          headerStyle: {
            fontWeight: 'bold',
            backgroundColor: 'var(--colorPrimary)',
            color: 'white'
          },
          draggable: false,

          rowStyle: (rowData, index) => {
            if (props.isDarkMode) {
              return index % 2
                ? {
                    backgroundColor: 'var(--colorPrimaryDarken2)',
                    color: 'white'
                  }
                : {
                    backgroundColor: 'var(--colorPrimaryDarken3)',
                    color: 'white'
                  };
            } else {
              return index % 2
                ? {
                    backgroundColor: 'var(--colorSecondaryLighten4)',
                    color: 'black'
                  }
                : {
                    backgroundColor: 'var(--colorSecondaryLighten3)',
                    color: 'black'
                  };
            }
          }
        }}
      />
    </div>
  );
}

export default Table;
