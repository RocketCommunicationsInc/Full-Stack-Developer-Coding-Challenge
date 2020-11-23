// Library Imports
import React, { useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { RuxButton } from '@astrouxds/rux-button/rux-button.js';
import { RuxStatus } from '@astrouxds/rux-status/rux-status.js';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

// counts statuses within dataset
const buildStatusCounts = (contacts) => {
  const counts = { normal: 0, caution: 0, serious: 0, critical: 0 };

  for (let contact of contacts) {
    let status = contact.contactStatus;
    if (status in counts) {
      counts[status]++;
    }
  }

  return counts;
}


const Table = (props) => {
  const [statusCounts, setStatusCounts] = useState({});
  const { data } = props;
  
  // updates status counts when mounted
  useEffect(() => {
    setStatusCounts(buildStatusCounts(data));
  }, [])
  
  const statsBar = Object.keys(statusCounts).map((status, i) => {
    let newString = status[0].toUpperCase() + status.slice(1);

    let count = statusCounts[status];
    return (
      <div key={i} className="table-stat">
        <rux-status status={status} className=""></rux-status>
        <p className="table-stat-text">{`${newString}: ${count}`}</p>
      </div>
    )
  });

  return (
    <div className="ag-theme-alpine-dark" style={ { height: 500, width: 600 } }>
      <div className="table-stats-container">
        <h2>Contacts</h2>
        <section className="table-stats">
          <div className="table-stat">
             <p className="table-stat-text">Total Contacts: {data.length}</p>
          </div>
          {statsBar}
        </section>
      </div>
      <AgGridReact
        pagination={true}
        paginationPageSize={25}
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