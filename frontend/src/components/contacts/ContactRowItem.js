import React from 'react';

const ContactRowItem = (props) => {
    const name = props.contact.contactName
    const contactStatus = props.contact.contactStatus
    const beginStamp = props.contact.contactBeginTimestamp
    const endStamp = props.contact.contactEndTimestamp

    return (
        <React.Fragment>
            <tr>
                <td>{name}</td>
                <td>{contactStatus}</td>
                <td>{beginStamp}</td>
                <td>{endStamp}</td>
            </tr>
  
        </React.Fragment>
    );
};

export default ContactRowItem;