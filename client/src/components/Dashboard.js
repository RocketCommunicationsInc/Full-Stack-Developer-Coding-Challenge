import React from "react";
import AlertsTable from "./AlertsTable";
import ContactsTable from "./ContactsTable";

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <div className="table-wrapper">
        <h2 className="table-title">Alerts</h2>
        <AlertsTable />
      </div>

      <div className="table-wrapper">
        <h2 className="table-title">Contacts</h2>
        <ContactsTable />
      </div>
    </div>
  );
};

export default Dashboard;
