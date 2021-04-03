import React from 'react';

const ContactStateTable = (props) => {
    let stateArray = []
    for (const [key, value] of Object.entries(props.stateHash)) {
        stateArray.push(`${key}: ${value}`);
    }

    return (
        <div>
            <ul style={{listStyleType:'none'}}>
                {stateArray.map((stateElement, i) => {
                    return <li key={i}>{stateElement}</li>
                })}
            </ul>
        </div>
    );
};

export default ContactStateTable;