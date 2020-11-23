// Library Imports
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Loading from './Loading';

// Local Imports
import ContactTable from './ContactTable';
import AlertTable from './AlertTable';

const MainPage = () => {
  // local state
  const [contacts, setContacts] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(true);

  // retrieves table data from server
  const fetchTableData = async () => {
    const contactRes = await axios.get("/api/contacts");
    const alertRes = await axios.get("/api/alerts");
    setContacts(contactRes.data);
    setAlerts(alertRes.data);
    setLoadingStatus(false);
  }

  // Only fires when component is initially mounted
  useEffect(() => {
    setLoadingStatus(true);
    fetchTableData();
  }, [])

  if (loadingStatus) {
    return <Loading />
  }

  const contactTable = <ContactTable data={contacts}/>
  const alertTable = <AlertTable data={alerts}/>

  return (
    <div className="main-tables-container">
      {contactTable}
      {alertTable}
    </div>
  )
}

export default MainPage;