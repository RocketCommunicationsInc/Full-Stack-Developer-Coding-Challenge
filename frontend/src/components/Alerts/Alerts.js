import React, { useEffect, useState } from "react";
import { API_BASE_URL } from '../../constants/constants';

const AlertsContext = React.createContext({
  alerts: [], fetchAlerts: () => {}
})

function Alerts(props){
  const [alerts, setAlerts] = useState([])
  //different method for fetching data
  const fetchAlerts = async () => {
    const response = await fetch(API_BASE_URL+"/alerts")
    const alerts = await response.json()
    setAlerts(alerts.data)
  }
  
  useEffect(() => {
    fetchAlerts()
  }, [])
  return (

    <div className="grid-zone inner-grid">
    <div className="grid-zone grid-zone--main__content__upper">
      <div class="grid-zone__label">
        <div class="bin-header">
          <h2>Alerts</h2>
          <div className="summary summary--all v">
            <span className="count"> { alerts.length } </span> Total Alerts
          </div>

          <div className="filters">
            
          </div>
        </div>
      </div>
      
      <div className="grid-zone__content scroll">
        <table className="rux-table">
          <tr className="rux-table__column-head"> 
            <th>Message</th>
            <th>Category</th>
            <th>Severity</th>
            <th>Time</th>
          </tr>
          <AlertsContext.Provider value={{alerts, fetchAlerts}}>
          {alerts.map((alert) => (
            <tr>
              <td>{alert.errorMessage}</td><td>{alert.errorSeverity}</td><td>{alert.errorCategory}</td><td>{alert.errorTime}</td>
            </tr>
            ))}
          </AlertsContext.Provider>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Alerts;