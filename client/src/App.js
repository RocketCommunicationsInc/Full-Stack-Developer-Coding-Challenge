import React from "react";
import AlertsTable from "./components/AlertsTable";
import ContactsTable from "./components/ContactsTable";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <AlertsTable />
      <ContactsTable />
    </div>
  );
}

export default App;
