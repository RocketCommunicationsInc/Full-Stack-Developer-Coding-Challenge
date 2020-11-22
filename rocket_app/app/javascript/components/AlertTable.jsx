// Library Imports
import React from "react";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

// Local Imports

const Table = (props) => {
  const { data } = props;

  return (
    <div className="ag-theme-alpine" style={ { height: 400, width: 600 } }>
      <AgGridReact
        rowData={data}>
        <AgGridColumn field="errorCategory" sortable={true}></AgGridColumn>
        <AgGridColumn field="errorMessage"></AgGridColumn>
        <AgGridColumn field="errorTime"></AgGridColumn>
      </AgGridReact>
    </div>
  );
}

export default Table;