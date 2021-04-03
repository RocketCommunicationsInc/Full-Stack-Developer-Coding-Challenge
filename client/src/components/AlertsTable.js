import React from "react";
import { alertsTestData } from "../alertsTestData";
import { RuxAccordion } from "@astrouxds/rux-accordion/rux-accordion.js";

function AlertsTable() {
  return (
    <div>
      <rux-accordion disabled>
        <span slot="label">Message</span>
        <span slot="label">Category</span>
        <span slot="label">Time</span>
      </rux-accordion>
      {alertsTestData.map((alert) => {
        return (
          <div key={alert.errorId}>
            <rux-accordion>
              <span slot="label">{alert.errorSeverity}</span>
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
