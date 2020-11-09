import React, {useEffect, useState} from "react"
import Grid from "@material-ui/core/Grid"

import axiosWithAuth from "../utils/axiosWithAuth"
import ContactTable from "./ContactTable"

const contactColumns = [
    { id: 'contactName', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'contactStatus', numeric: true, disablePadding: true, label: 'Status' },
    { id: 'contactBeginTimestamp', numeric: true, disablePadding: true, label: 'Begin Timestamp' },
    { id: 'contactEndTimestamp', numeric: true, disablePadding: true, label: 'End Timestamp' },
  ];
  

const Dashboard = props => {
    const [alerts, setAlerts] = useState([])
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        axiosWithAuth()
            .get("alerts")
            .then(res => {

                setAlerts(res.data)
            })
            .catch(error => {
                console.error(error.response)
            })
        axiosWithAuth()
            .get("contacts")
            .then(res => {
                console.log(res.data[0])
                setContacts(res.data)
            })
            .catch(error => {
                console.error(error.response)
            })
    }, [])

    return (
        <div className="dashboard-container">
            <h1>Welcome to the Dashboard!</h1>
            <Grid container spacing={1}>
                <Grid item>
                    <ContactTable
                        columns={contactColumns}
                        rows={contacts}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard