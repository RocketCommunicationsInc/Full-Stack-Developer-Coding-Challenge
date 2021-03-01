import React, { useState } from 'react';
import {
  Col,
  Container,
  Row
} from 'reactstrap';
import { getAlerts } from '../../services/alertsService.js';
import { getContacts } from '../../services/contactsService.js';
import Contacts from '../contacts/Contacts.js';
import "./Dashboard.css"

const Dashboard = () => {

  // eslint-disable-next-line
  const [alertsData, setAlertsData] = useState([]);
  // eslint-disable-next-line
  const [contactsData, setContactsData] = useState([]);
  console.log(alertsData);
  console.log(contactsData);

  // setAlertsData(getAlertsData());
  // setContactsData(getContactsData());

  return (
    <div className="d-flex flex-row justify-content-center align-content-center">
      <Container fluid={true} id="dashboard-container">
        <Row>
          <Col md="12">
            <Row>
              <Col md="5">
                <div>
                </div>
              </Col>
              <Col md="7">
                <Contacts contacts={getViewableContactData(contactsData)} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const getViewableContactData = (data) => {
  if (data) {
    return data.map(contact => contact.contactState || contact.contactName || contact.contactStatus || contact.contactBeginTimestamp || contact.contactEndTimestamp);
  }
  
}

// eslint-disable-next-line
const getAlertsData = () => {
  getAlerts().then((data) => {
    return data;
  }).catch((error) => {
    console.log(error);
  }); 
};
// eslint-disable-next-line
const getContactsData = () => {
  getContacts().then((data) => {
    return data;
  }).catch((error) => {
    console.log(error);
  });
};

export default Dashboard;