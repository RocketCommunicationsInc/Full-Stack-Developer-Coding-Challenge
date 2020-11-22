// Library Imports
import React from "react";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';

// Local Imports

const Table = (props) => {
  const { data } = props;

  return (
    <div className="ag-theme-alpine" style={ { height: 500, width: 600 } }>
      <AgGridReact
        rowData={data}>
        <AgGridColumn field="contactName" sortable={true}></AgGridColumn>
        <AgGridColumn field="contactStatus"></AgGridColumn>
        <AgGridColumn field="contactBeginTimestamp"></AgGridColumn>
        <AgGridColumn field="contactEndTimestamp"></AgGridColumn>
      </AgGridReact>
    </div>
  );
}

export default Table;