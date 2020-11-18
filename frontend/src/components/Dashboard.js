import React, { useState } from 'react';
import Contacts from './Contacts'
import Alerts from './Alerts'
import Switch from "react-switch";


const Dashboard = () => {
    const [checkedAlerts, setAlertChecked] = useState(true);
    const [checkedContacts, setContactChecked] = useState(true);

    function toggleAlerts(checkedAlerts){
        setAlertChecked(checkedAlerts);
    }
    function toggleContacts(checkedContacts){
        setContactChecked(checkedContacts);
    }

    return (
        
        <div>
            <div className="toggle-1">
            <label>
                <h3>Toggle Alerts Table</h3>
                    <Switch onColor="#005A8F" onChange={toggleAlerts} checked={checkedAlerts} />   
            </label>
            </div>
            <div className="toggle-2">
            <label>
                <h3>Toggle Contacts Table  </h3>
                    <Switch onColor="#005A8F" onChange={toggleContacts} checked={checkedContacts} />   
            </label>
            </div>
           <br></br>
           <br></br>
            {checkedAlerts ? <Alerts/> : null}

            {checkedContacts ? <Contacts/> : null}  
        </div>
    )
}

export default Dashboard;