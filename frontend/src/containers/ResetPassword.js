/** @format */

import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password } from "../actions/auth";
import {
  Container,
  MainText,
  Input,
  LargeRuxButton,
  Form,
} from "../GlobalStyles/globalStyles";
import "../GlobalStyles/button.css";

const ResetPassword = (props) => {
  const [requestSent, setRequestSent] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    props.reset_password(email);
    setRequestSent(true);
  };

  if (requestSent) return <Redirect to="/login" />;
  return (
    <Container>
      <MainText>Request Password Reset:</MainText>
      <Form onSubmit={(e) => onSubmit(e)}>
        <div>
          <Input
            type="email"
            placeholder="Your Email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <LargeRuxButton
          className="rux-button"
          style={{ margin: "1rem" }}
          type="submit"
        >
          Reset Password
        </LargeRuxButton>
      </Form>
    </Container>
  );
};

export default connect(null, { reset_password })(ResetPassword);
