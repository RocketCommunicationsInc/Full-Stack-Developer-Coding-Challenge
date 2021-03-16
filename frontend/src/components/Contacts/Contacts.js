import React, { useEffect, useState } from "react";
import { API_BASE_URL } from '../../constants/constants';

const ContactsContext = React.createContext({
  contacts: [], fetchContacts: () => {}
})
function Contacts(props){
  const [contacts, setContacts] = useState([])
  //different method for fetching data
  const fetchContacts = async () => {
    const response = await fetch(API_BASE_URL+"/contacts")
    const contacts = await response.json()
    setContacts(contacts.data)
  }
  useEffect(() => {
    fetchContacts()
  }, [])

  //parse unique counts for contact state 
  var counts = {};
  for (var i = 0; i < contacts.length; i++) {
      counts[contacts[i].contactState] = 1 + (counts[contacts[i].contactState] || 0);
  }

  return (
    <div className="grid-zone inner-grid">
    <div className="grid-zone grid-zone--main__content__upper">
      <div class="grid-zone__label">
        <div class="bin-header">
          <h2>Contacts</h2>
          <div className="summary summary--all">
            <span className="count"> { contacts.length } </span> Total Contacts
          </div>
          <div className="summary summary--failed">
            <span className="count"> { counts.failed } </span> Failed
          </div>
          <div className="summary summary--executing">
            <span className="count"> { counts.executing } </span> Executing
          </div>

          <div className="filters">
            
          </div>
        </div>
      </div>
      
      <div className="grid-zone__content scroll">
        <table className="rux-table">
          <tr className="rux-table__column-head"> 
            <th>Name</th>
            <th>Status</th>
            <th>Begin</th>
            <th>End</th>
          </tr>
          <ContactsContext.Provider value={{contacts, fetchContacts}}>
          {contacts.map((contact) => (
            <tr>
              <td>{contact.contactName}</td><td>{contact.contactStatus}</td><td>{contact.contactBeginTimestamp}</td><td>{contact.contactEndTimestamp} </td>
            </tr>
            ))}
          </ContactsContext.Provider>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Contacts;