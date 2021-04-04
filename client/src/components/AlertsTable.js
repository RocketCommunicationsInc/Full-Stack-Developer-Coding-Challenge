import React, { useState, useEffect } from "react";
import { alertsTestData } from "../alertsTestData";
/* eslint-disable no-unused-vars */
import { RuxAccordion } from "@astrouxds/rux-accordion/rux-accordion.js";
import { RuxStatus } from "@astrouxds/rux-status/rux-status.js";
/* eslint-enable no-unused-vars */

function AlertsTable() {
  const [alertData, setAlertData] = useState(null);

  useEffect(() => {
    fetch("/api/alerts")
      .then((res) => res.json())
      .then((data) => setAlertData(data));
  }, []);

  console.log(alertData);

  return (
    <div>
      <h1>Alerts</h1>
      <rux-accordion disabled>
        <span slot="label">Message</span>
        <span slot="label">Category</span>
        <span slot="label">Time</span>
      </rux-accordion>
      {alertsTestData.map((alert) => {
        return (
          <div key={alert.errorId}>
            <rux-accordion>
              <span slot="label">
                <rux-status status={alert.errorSeverity}></rux-status>
              </span>
              <span slot="label">{alert.errorMessage}</span>
              <span slot="label">{alert.errorCategory}</span>
              <span slot="label">{`${new Date(alert.errorTime)}`}</span>
              <span slot="content">{alert.longMessage}</span>
            </rux-accordion>
          </div>
        );
      })}
    </div>
  );
}

export default AlertsTable;
