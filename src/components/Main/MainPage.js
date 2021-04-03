import React, { useState, useEffect } from "react";
import { AlertsTable } from "./AlertsTable";
import { ContactsTable } from "./ContactsTable";
import { StatusBar } from "./StatusBar";
import { BACKEND_HOST } from "../../constants";

export const MainPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_HOST}/alerts`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAlerts(data);
      });

    fetch(`${BACKEND_HOST}/contacts`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setContacts(data);
      });
  }, []);

  return (
    <div className="grid-zone container">
      <StatusBar />
      <AlertsTable alerts={alerts} />
      <ContactsTable contacts={contacts} alerts={alerts} />
    </div>
  );
};
