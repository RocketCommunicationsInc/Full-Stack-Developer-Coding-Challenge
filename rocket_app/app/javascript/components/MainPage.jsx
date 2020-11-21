// Library Imports
import axios from 'axios';
import React, { useState, useEffect } from 'react';


// Local Imports
import Table from './Table';

const MainPage = (props) => {
  const [contacts, setContacts] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);

  useEffect(() => {
    setLoadingStatus(true);
    axios.get("/api/contacts")
      .then(res => {
        // debugger;
        const newContacts = res.data;
        setContacts(newContacts);
        setLoadingStatus(false);
      });

    setLoadingStatus(true);
    axios.get("/api/alerts")
      .then(res => {
        // debugger;
        const newAlerts = res.data;
        setAlerts(newAlerts);
        setLoadingStatus(false);
    });
  }, [])

  // const tableData = contacts.map(contact => {
  //   return null;
  //   // Make Row <TableRow contact={contact} key={}/>
  //   // return contact.map(column => {
  //   //   return <td>{column}</td>
  //   // })
  // })
  if (loadingStatus) {
    return (
      <div className="rux-progress">
        <progress></progress>
      </div>
    )
  }

  const contactTable = <Table data={contacts}/>
  // console.log(alerts)
  return (
    <div>
      {contactTable}
    </div>
  )
}

export default MainPage;