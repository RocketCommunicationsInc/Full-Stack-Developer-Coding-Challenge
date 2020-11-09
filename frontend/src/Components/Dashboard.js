import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";

import axiosWithAuth from "../utils/axiosWithAuth";
import ContactTable from "./ContactTable";
import AlertsTable from "./AlertsTable";

const contactColumns = [
  { id: "contactName", numeric: false, disablePadding: true, label: "Name" },
  { id: "contactStatus", numeric: true, disablePadding: true, label: "Status" },
  {
    id: "contactBeginTimestamp",
    numeric: true,
    disablePadding: true,
    label: "Begin Timestamp",
  },
  {
    id: "contactEndTimestamp",
    numeric: true,
    disablePadding: true,
    label: "End Timestamp",
  },
];

const alertColumns = [
  {
    id: "errorMessage",
    numeric: false,
    disablePadding: true,
    label: "Message",
  },
  {
    id: "errorCategory",
    numeric: false,
    disablePadding: true,
    label: "Category",
  },
  { id: "errorTime", numeric: false, disablePadding: true, label: "Time" },
];

const Dashboard = (props) => {
  const [alerts, setAlerts] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("alerts")
      .then((res) => {
        setAlerts(res.data);
      })
      .catch((error) => {
        console.error(error.response);
      });
    axiosWithAuth()
      .get("contacts")
      .then((res) => {
        console.log(res.data[0]);
        setContacts(res.data);
      })
      .catch((error) => {
        console.error(error.response);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Welcome to your Dashboard!</h1>
      <Grid
        container
        spacing={1}
        className="tables-container"
        justify="center"
        align="center"
      >
        <Grid item>
          <AlertsTable columns={alertColumns} rows={alerts} />
        </Grid>
        <Grid item>
          <ContactTable columns={contactColumns} rows={contacts} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
