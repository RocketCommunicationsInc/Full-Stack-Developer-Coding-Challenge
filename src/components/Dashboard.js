import axiosInstance from "../config/axiosApi";
import { useEffect, useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css";
import "@astrouxds/ag-grid-theme/dist/main.css";
import "./Dashboard.css";

// About Dashboard
const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [alerts, setAlerts] = useState([]);
  useEffect(() => {
    axiosInstance
      .get('item/contacts/')
      .then((response) => {
        setContacts(
          response.data.map((contact) => ({
            contactname: contact.contact_name,
            contactstatus: contact.contact_status,
            contactBeginTimestamp: contact.contact_begin_timestamp,
            contactEndTimestamp: contact.contact_end_timestamp,
          }))
        );
      })
      .catch(() => {});
    axiosInstance
      .get('item/alerts/')
      .then((response) => {
        setAlerts(
          response.data.map((alert) => ({
            errormessage: alert.error_message,
            errorcategory: alert.error_category,
            errorTime: alert.error_time,
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
