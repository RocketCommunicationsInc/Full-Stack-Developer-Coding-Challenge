import axios from "axios";
import { useEffect, useState } from "react";
import { API_SERVER } from "../config/constant";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css";
import "@astrouxds/ag-grid-theme/dist/main.css";
import "./Dashboard.css";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
const options = {
  credentials: "same-origin",
  headers: {
    "X-CSRF-TOKEN": getCookie("csrf_access_token"),
  },
};

// About Page
const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [alerts, setAlerts] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_SERVER}items/contacts`, options)
      .then(({ data }) => {
        setContacts(
          data.map((contact) => ({
            contactname: contact.contactName,
            contactstatus: contact.contactStatus,
            contactBeginTimestamp: contact.contactBeginTimestamp,
            contactEndTimestamp: contact.contactEndTimestamp,
          }))
        );
      })
      .catch(() => {});
    axios
      .get(`${API_SERVER}items/alerts`, options)
      .then(({ data }) => {
        setAlerts(
          data.map((alert) => ({
            errormessage: alert.errorMessage,
            errorcategory: alert.errorCategory,
            errorTime: alert.errorTime,
          }))
        );
      })
      .catch(() => {});
  }, []);
  return (
    <>
      <div className="pane-holder">
        <div className="alert-pane pane">
          <h1>{alerts.length ? alerts.length : ""} Alerts</h1>
          <AgGridReact className="ag-theme-astro" rowData={alerts}>
            <AgGridColumn
              tooltipField="errormessage"
              flex={2}
              headerName="Error Message"
              field="errormessage"
            />
            <AgGridColumn
              sortable
              flex={1}
              headerName="Error Category"
              field="errorcategory"
              tooltipField="errorcategory"
            />
            <AgGridColumn
              headerName="Error Time"
              flex={2}
              tooltipField="errortime"
              field="errorTime"
            />
          </AgGridReact>
        </div>
        <div className="contact-pane pane">
          <h1>{contacts.length ? contacts.length : ""} Contacts</h1>
          <AgGridReact className="ag-theme-astro" rowData={contacts}>
            <AgGridColumn
              sortable
              flex={1}
              headerName="Contact Name"
              tooltipField="contactname"
              field="contactname"
            />
            <AgGridColumn
              flex={1}
              tooltipField="contactstatus"
              headerName="Contact Status"
              field="contactstatus"
            />
            <AgGridColumn
              flex={1}
              tooltipField="contactBeginTimestamp"
              headerName="Begin"
              field="contactBeginTimestamp"
            />
            <AgGridColumn
              flex={1}
              headerName="End"
              tooltipField="contactEndTimestamp"
              field="contactEndTimestamp"
            />
          </AgGridReact>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
