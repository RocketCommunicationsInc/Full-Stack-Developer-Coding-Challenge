import React, { useEffect, useState } from "react";
import { BACKEND_HOST } from "../../constants";

export const ContactsTable = (props) => {
  const { contacts } = props;

  const alertRows = contacts.map((contact) => {
    return (
      <tr>
        <td>{contact.contactState}</td>
        <td>{contact.contactStatus}</td>
        <td>{contact.contactName}</td>
        <td>{contact.beginTimestamp}</td>
        <td>{contact.endTimeStamp}</td>
      </tr>
    );
  });

  //Throwing an error even after making an exception for failed. Try/Catch would probably be best bet for resolving.
  const uniqueContactStates = () => {
    let uniqueStates = { failed: 1 };
    let count = 1;
    contacts.forEach((contact) => {
      console.log(contact.contactState);
      if (!uniqueStates.contact.contactState) {
        uniqueStates.contact.contactState = 1;
        count += 1;
      }
    });
    return count;
  };

  const contactCount = contacts.length;

  return (
    <div className="grid-zone grid-zone--main contacts-report">
      <div
        style={{
          height: "6em",
          display: "grid",
          gridAutoRows: "minmax(15px, auto)",
          alignItems: "flex-End",
          backgroundColor: "rgb(24, 38, 53)",
        }}
      >
        <div
          style={{
            fontSize: "3rem",
            gridColumn: "1",
            gridRow: "3",
          }}
        >
          Contacts
        </div>
        <span
          style={{
            marginLeft: "5px",
            gridColumn: "2",
            gridRow: "3",
            justifySelf: "center",
            // alignSelf: "start",
            fontSize: "1.5rem",
          }}
        >
          Total Contacts
        </span>
        <div
          style={{
            gridColumn: "2",
            gridRow: "2",
            justifySelf: "center",
            fontSize: "2rem",
            alignSelf: "end",
          }}
        >
          {contactCount}
        </div>
        <label
          style={{
            gridColumn: "3",
            gridRow: "2",
            justifySelf: "center",
          }}
        >
          Sort Categories
        </label>
        <select
          style={{
            gridColumn: "3",
            gridRow: "3",
            justifySelf: "center",
            alignSelf: "end",
          }}
          className="rux-select rux-select--small"
        >
          <option>Ascending</option>
          <option>Descending</option>
        </select>
      </div>
      <div
        className="grid-zone__content"
        style={{ overflowY: "scroll", height: "22em" }}
      >
        <table class="rux-table">
          <tr style={{ backgroundColor: "rgb(0, 18, 29)" }}>
            <td style={{ fontStyle: "oblique" }}>State</td>
            <td style={{ fontStyle: "oblique" }}>Status </td>
            <td style={{ fontStyle: "oblique" }}>Name</td>
            <td style={{ fontStyle: "oblique" }}>Timestamp Start</td>
            <td style={{ fontStyle: "oblique" }}>TimeStamp End</td>
          </tr>
          {alertRows}
        </table>
      </div>
    </div>
  );
};
