import React from "react";
import AlertsTable from "./AlertsTable";
import ContactsTable from "./ContactsTable";
import { useAuth } from "../hooks/useAuthContext";

const Dashboard = ({ user }) => {
  const auth = useAuth();
  return (
    <div>
      <p>{auth.user.name}</p>
      <AlertsTable />
      <ContactsTable />
    </div>
  );
};

export default Dashboard;
