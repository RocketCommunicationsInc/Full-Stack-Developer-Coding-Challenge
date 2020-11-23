// Library Imports
import React from "react";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

const Table = (props) => {
  const { data } = props;

  return (
    <div className="ag-theme-alpine-dark" style={ { height: 500, width: 600 } }>
      <div className="table-stats-container">
        <h2>Alerts</h2>
      </div>
      <AgGridReact
        pagination={true}
        paginationPageSize={25}
        rowData={data}>
        <AgGridColumn field="errorCategory" sortable={true}></AgGridColumn>
        <AgGridColumn field="errorMessage"></AgGridColumn>
        <AgGridColumn field="errorTime"></AgGridColumn>
      </AgGridReact>
    </div>
  );
}

export default Table;