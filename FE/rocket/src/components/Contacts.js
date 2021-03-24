import React, { useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

const Contacts = (props) => {
  //   const [gridApi, setGridApi] = useState(null);
  //   const [gridColumnApi, setGridColumnApi] = useState(null);
  //   const [contactLength, setContactLength] = useState(0);

  let contact_states = [];

  props.contacts.map((el) => {
    contact_states.push(el.contactState);
  });
  let my_obj = {};
  for (let i = 0; i < contact_states.length; i++) {
    if (my_obj[contact_states[i]]) {
      continue;
    } else {
      my_obj[contact_states[i]] = 1;
    }
  }
  let size = Object.keys(my_obj).length;

  let contact_columns = [
    "contactName",
    "contactStatus",
    "contactBeginTimestamp",
    "contactEndTimestamp",
    "contactState",
  ];
  const gridOptions = {
    statusBar: {
      statusPanels: [
        {
          statusPanel: "agTotalRowCountComponent",
          align: "left",
        },
      ],
    },

    // other grid options ...
  };
  return (
    <div
      className="ag-theme-alpine-dark"
      style={{ height: "42vh", width: "100%" }}
    >
      <h3>Total Unique Status's: {size}</h3>
      <AgGridReact rowData={props.contacts} gridOptions={gridOptions}>
        {contact_columns.map((el) => {
          return <AgGridColumn field={el} key={el} sortable={true} />;
        })}
      </AgGridReact>
    </div>
  );
};

export default Contacts;
