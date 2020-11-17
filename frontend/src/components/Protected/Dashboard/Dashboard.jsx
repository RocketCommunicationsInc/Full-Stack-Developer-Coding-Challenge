/** @format */

import React from "react";
import ContactData from "../../ContactData/contactData";
import Card from "../../Card/Card";
import Navbar from "../../Navbar/Navbar";
import Alertdata from "../../alertData/AlertData";
import {
  MainDiv,
  AlertDataDiv,
  PaneDiv,
  RightMainDiv,
  CardDiv,
} from "./Dashboard.elements";

function Dashboard() {
  return (
    <>
      <Navbar />
      <MainDiv>
        <AlertDataDiv>
          <PaneDiv>Alerts Pane</PaneDiv>
          <Alertdata />
          <PaneDiv></PaneDiv>
        </AlertDataDiv>
        <RightMainDiv>
          <PaneDiv>Contacts Pane</PaneDiv>
          <ContactData style={{ flex: 1 }} />
          <PaneDiv>Chart Pane</PaneDiv>
          <CardDiv>
            <Card style={{ padding: "1rem 0 0 0" }} />
            <Card style={{ height: "50%" }} />
          </CardDiv>
        </RightMainDiv>
      </MainDiv>
    </>
  );
}

export default Dashboard;
