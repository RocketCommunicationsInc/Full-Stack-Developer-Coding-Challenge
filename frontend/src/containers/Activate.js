/** @format */

import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../actions/auth";
import {
  Container,
  MainText,
  LargeRuxButton,
} from "../GlobalStyles/globalStyles";
import "../GlobalStyles/button.css";

const Activate = (props) => {
  const [verified, setVerified] = useState(false);

  const verify_account = (e) => {
    const uid = props.match.params.uid;
    const token = props.match.params.token;

    props.verify(uid, token);
    setVerified(true);
  };

  if (verified) return <Redirect to="/login" />;
  return (
    <Container>
      <MainText>Verify your Account:</MainText>
      <LargeRuxButton
        className="rux-button"
        style={{ margin: "1rem" }}
        onClick={verify_account}
        size="large"
      >
        Verify
      </LargeRuxButton>
    </Container>
  );
};

export default connect(null, { verify })(Activate);
