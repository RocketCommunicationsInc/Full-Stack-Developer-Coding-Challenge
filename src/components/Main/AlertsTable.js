import React, { useEffect, useState } from "react";
import { BACKEND_HOST } from "../../constants";

export const AlertsTable = (props) => {
  const { alerts } = props;

  const alertRows = alerts.map((alert, index) => {
    return (
      <tr>
        <td>{alert.errorCategory}</td>
        <td>{alert.errorMessage}</td>
        <td>{alert.errorTime}</td>
      </tr>
    );
  });

  return (
    <div className="alerts-report">
      <div
        style={{
          height: "6em",
          display: "grid",
          gridAutoRows: "minmax(15px, auto)",
          alignItems: "flex-End",
          backgroundColor: "rgb(24, 38, 53)",
        }}
      >
        <div style={{ fontSize: "3rem", gridColumn: "1", gridRow: "2" }}>
          Alerts
        </div>
      </div>
      <div
        className="grid-zone__content"
        style={{ overflowY: "scroll", height: "22em" }}
      >
        <table class="rux-table">
          <tr style={{ backgroundColor: "rgb(0, 18, 29)" }}>
            <td style={{ fontStyle: "oblique" }}>Category</td>
            <td style={{ fontStyle: "oblique" }}>Message </td>
            <td style={{ fontStyle: "oblique" }}>Time </td>
          </tr>
          {alertRows}
        </table>
      </div>
    </div>
  );
};
