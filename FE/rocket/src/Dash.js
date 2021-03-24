import React, { useState, useEffect } from "react";
import axios from "axios";
import Alerts from "./components/Alerts.js";
import axiosWithAuth from "./axiosWithAuth.js";
import Contacts from "./components/Contacts.js";
import Nav from "./Nav.js";
import { Redirect } from "react-router";

const Dash = (props) => {
  const [alerts, setAlerts] = useState([]);
  const [token, setToken] = React.useState("");
  const [contacts, setContacts] = React.useState([]);

  useEffect(() => {
    console.log("RUNNIGN GETALERTS");
    setToken(localStorage.getItem("token"));
    axiosWithAuth()
      .get("alerts")
      //   .get("http://127.0.0.1:5000/alerts", {
      //     headers: {
      //       Authorization: "Bearer " + token,
      //     },
      //   })
      //* Wanted this to work, adding an axios auth route did the trick
      .then((res) => {
        // console.log(res, "GET ALERTS RES");
        setAlerts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axiosWithAuth()
      .get("contacts")
      .then((res) => {
        // console.log(res, "GET CONTACTS RES");
        setContacts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="dash-wrapper">
      {props.token ? (
        <div>
          <Nav history={props.history} />
          <Alerts alerts={alerts} />
          <Contacts contacts={contacts} />
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};

export default Dash;
