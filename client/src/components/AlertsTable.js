import React, { useState, useEffect } from "react";
import { useData } from "../hooks/useData";
/* eslint-disable no-unused-vars */
import { RuxAccordion } from "@astrouxds/rux-accordion/rux-accordion.js";
import { RuxStatus } from "@astrouxds/rux-status/rux-status.js";
/* eslint-enable no-unused-vars */

function AlertsTable() {
  const { data, getAlertsData } = useData();
  const [sortCategory, setSortCategory] = useState(null);
  const [displayedData, setDisplayedData] = useState(data);

  const getData = async () => {
    await getAlertsData();
  };

  useEffect(() => {
    getData();
    setDisplayedData(data);
  }, []);

  useEffect(() => {
    if (data) {
      const sortedData = [...data];
      sortedData.sort((a, b) => {
        if (a[sortCategory] < b[sortCategory]) {
          return -1;
        }
        if (a[sortCategory] > b[sortCategory]) {
          return 1;
        }
        return 0;
      });
      setDisplayedData(sortedData);
    }
  }, [sortCategory, data]);

  return (
    <>
      <table className="rux-table">
        <thead>
          <tr>
            <th scope="col" className="rux-table__column-head">
              Status
              <span
                onClick={() => {
                  sortCategory
                    ? setSortCategory(null)
                    : setSortCategory("errorSeverity");
                }}
              >
                <svg
                  height="15"
                  viewBox="0 0 1792 1792"
                  width="15"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1216 1568v192q0 14-9 23t-23 9h-256q-14 0-23-9t-9-23v-192q0-14 9-23t23-9h256q14 0 23 9t9 23zm-480-128q0 12-10 24l-319 319q-10 9-23 9-12 0-23-9l-320-320q-15-16-7-35 8-20 30-20h192v-1376q0-14 9-23t23-9h192q14 0 23 9t9 23v1376h192q14 0 23 9t9 23zm672-384v192q0 14-9 23t-23 9h-448q-14 0-23-9t-9-23v-192q0-14 9-23t23-9h448q14 0 23 9t9 23zm192-512v192q0 14-9 23t-23 9h-640q-14 0-23-9t-9-23v-192q0-14 9-23t23-9h640q14 0 23 9t9 23zm192-512v192q0 14-9 23t-23 9h-832q-14 0-23-9t-9-23v-192q0-14 9-23t23-9h832q14 0 23 9t9 23z" />
                </svg>
              </span>
            </th>
            <th scope="col" className="rux-table__column-head">
              Message
              <span
                onClick={() => {
                  sortCategory
                    ? setSortCategory(null)
                    : setSortCategory("errorMessage");
                }}
              >
                <svg
                  height="15"
                  viewBox="0 0 1792 1792"
                  width="15"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1216 1568v192q0 14-9 23t-23 9h-256q-14 0-23-9t-9-23v-192q0-14 9-23t23-9h256q14 0 23 9t9 23zm-480-128q0 12-10 24l-319 319q-10 9-23 9-12 0-23-9l-320-320q-15-16-7-35 8-20 30-20h192v-1376q0-14 9-23t23-9h192q14 0 23 9t9 23v1376h192q14 0 23 9t9 23zm672-384v192q0 14-9 23t-23 9h-448q-14 0-23-9t-9-23v-192q0-14 9-23t23-9h448q14 0 23 9t9 23zm192-512v192q0 14-9 23t-23 9h-640q-14 0-23-9t-9-23v-192q0-14 9-23t23-9h640q14 0 23 9t9 23zm192-512v192q0 14-9 23t-23 9h-832q-14 0-23-9t-9-23v-192q0-14 9-23t23-9h832q14 0 23 9t9 23z" />
                </svg>
              </span>
            </th>
            <th scope="col" className="rux-table__column-head">
              Category
              <span
                onClick={() => {
                  sortCategory
                    ? setSortCategory(null)
                    : setSortCategory("errorCategory");
                }}
              >
                <svg
                  height="15"
                  viewBox="0 0 1792 1792"
                  width="15"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1216 1568v192q0 14-9 23t-23 9h-256q-14 0-23-9t-9-23v-192q0-14 9-23t23-9h256q14 0 23 9t9 23zm-480-128q0 12-10 24l-319 319q-10 9-23 9-12 0-23-9l-320-320q-15-16-7-35 8-20 30-20h192v-1376q0-14 9-23t23-9h192q14 0 23 9t9 23v1376h192q14 0 23 9t9 23zm672-384v192q0 14-9 23t-23 9h-448q-14 0-23-9t-9-23v-192q0-14 9-23t23-9h448q14 0 23 9t9 23zm192-512v192q0 14-9 23t-23 9h-640q-14 0-23-9t-9-23v-192q0-14 9-23t23-9h640q14 0 23 9t9 23zm192-512v192q0 14-9 23t-23 9h-832q-14 0-23-9t-9-23v-192q0-14 9-23t23-9h832q14 0 23 9t9 23z" />
                </svg>
              </span>
            </th>
            <th scope="col" className="rux-table__column-head">
              Time
              <span
                onClick={() => {
                  sortCategory
                    ? setSortCategory(null)
                    : setSortCategory("errorSeverity");
                }}
              >
                <svg
                  height="15"
                  viewBox="0 0 1792 1792"
                  width="15"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1216 1568v192q0 14-9 23t-23 9h-256q-14 0-23-9t-9-23v-192q0-14 9-23t23-9h256q14 0 23 9t9 23zm-480-128q0 12-10 24l-319 319q-10 9-23 9-12 0-23-9l-320-320q-15-16-7-35 8-20 30-20h192v-1376q0-14 9-23t23-9h192q14 0 23 9t9 23v1376h192q14 0 23 9t9 23zm672-384v192q0 14-9 23t-23 9h-448q-14 0-23-9t-9-23v-192q0-14 9-23t23-9h448q14 0 23 9t9 23zm192-512v192q0 14-9 23t-23 9h-640q-14 0-23-9t-9-23v-192q0-14 9-23t23-9h640q14 0 23 9t9 23zm192-512v192q0 14-9 23t-23 9h-832q-14 0-23-9t-9-23v-192q0-14 9-23t23-9h832q14 0 23 9t9 23z" />
                </svg>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedData ? (
            displayedData.map((alert) => {
              return (
                <tr key={alert.errorId}>
                  <td>
                    <rux-status status={alert.errorSeverity}></rux-status>
                  </td>
                  <td>{alert.errorMessage}</td>
                  <td>{alert.errorCategory}</td>
                  <td>{`${new Date(alert.errorTime)}`}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>Loading data...</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default AlertsTable;
