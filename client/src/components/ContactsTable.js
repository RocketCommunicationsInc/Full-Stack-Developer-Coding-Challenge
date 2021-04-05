import React, { useState, useEffect } from "react";
import { useData } from "../hooks/useData";
/* eslint-disable no-unused-vars */
import { RuxAccordion } from "@astrouxds/rux-accordion/rux-accordion.js";
import { RuxStatus } from "@astrouxds/rux-status/rux-status.js";
import { RuxTabs } from "@astrouxds/rux-tabs/rux-tabs.js";
/* eslint-enable no-unused-vars */

function ContactsTable() {
  const { data, getContactsData } = useData();
  const [sortCategory, setSortCategory] = useState(null);
  const [displayedData, setDisplayedData] = useState(data);
  const [totalContacts, setTotalContacts] = useState(null);
  const [totalStates, setTotalStates] = useState(null);

  const getData = async () => {
    await getContactsData();
  };

  const countUnique = (array, key) => {
    let valuesArray = array.map((obj) => obj[key]);
    return new Set(valuesArray).size;
  };

  useEffect(() => {
    getData();
    setDisplayedData(data);
  }, []);

  const getDataStats = (data) => {
    setTotalContacts(data.length);
    setTotalStates(countUnique(data, "contactState"));
  };

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
      getDataStats(data);
    }
  }, [sortCategory, data]);

  return (
    <>
      <div className="stats-wrapper">
        <div>Total Contacts: {totalContacts}</div>
        <div>Total States: {totalStates}</div>
      </div>

      <table className="rux-table">
        <thead>
          <tr>
            <th scope="col" className="rux-table__column-head">
              Status
              <span
                onClick={() => {
                  sortCategory
                    ? setSortCategory(null)
                    : setSortCategory("contactStatus");
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
              Name
              <span
                onClick={() => {
                  sortCategory
                    ? setSortCategory(null)
                    : setSortCategory("contactName");
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
              GS
              <span
                onClick={() => {
                  sortCategory
                    ? setSortCategory(null)
                    : setSortCategory("contactGround");
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
              Equipment String
              <span
                onClick={() => {
                  sortCategory
                    ? setSortCategory(null)
                    : setSortCategory("contactEquipment");
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
            <th
              scope="col"
              className="rux-table__column-head"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              State
              <span
                onClick={() => {
                  sortCategory
                    ? setSortCategory(null)
                    : setSortCategory("contactState");
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
              Step
              <span
                onClick={() => {
                  sortCategory
                    ? setSortCategory(null)
                    : setSortCategory("contactStep");
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
              AOS - LOS
              <span
                onClick={() => {
                  sortCategory
                    ? setSortCategory(null)
                    : setSortCategory("contactBeginTimestamp");
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
            displayedData.map((contact) => {
              return (
                <tr key={contact.contactId}>
                  <td>
                    <rux-status status={contact.contactStatus}></rux-status>
                  </td>
                  <td>{contact.contactName}</td>
                  <td>{contact.contactGround}</td>
                  <td>{contact.contactEquipment}</td>
                  <td>{`${contact.contactState} (Step: ${contact.contactStep})`}</td>
                  <td>{`${new Date(contact.contactBeginTimestamp)}-${new Date(
                    contact.contactEndTimestamp
                  )}`}</td>
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

export default ContactsTable;
