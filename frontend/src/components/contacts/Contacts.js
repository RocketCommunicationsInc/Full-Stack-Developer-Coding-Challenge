import React from 'react';
import ContactRowItem from './ContactRowItem';
import ContactStateTable from './ContactStateTable'

const Contacts = (props) => {
    const numberOfContacts = props.contacts.length
    let stateHash = {} 

    for(let contact of props.contacts){
        if(stateHash[contact.contactState]){
            stateHash[contact.contactState]++
        } else {
            stateHash[contact.contactState] = 1
        }
    }

    return (
        <div>
            {/* TODO: sorting on name */}
            <h1>Contacts</h1>
            <h3>Total Number of Contacts: {numberOfContacts} </h3>
            <h3>Different Contact States</h3>
            <ContactStateTable stateHash={stateHash}/>
            <table className="contacts-table">
                <thead>
                    <tr>
                        <th>Display Name</th>
                        <th>Status</th>
                        <th>Begin Timestamp</th>
                        <th>End Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {props.contacts.map(record => {
                        return <ContactRowItem contact={record}/>
                    })}                 
                </tbody>
            </table>
        </div>
    );
};

export default Contacts;