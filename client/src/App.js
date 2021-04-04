import React from "react";
import AlertsTable from "./components/AlertsTable";
import ContactsTable from "./components/ContactsTable";
import Modal from "./components/Modal";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <AlertsTable />
      <ContactsTable />
      <Modal />
    </div>
  );
}

export default App;
