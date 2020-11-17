/** @format */

import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signup } from "../actions/auth";
import {
  Container,
  MainText,
  ButtonLink,
  SmallText,
  Input,
  LargeRuxButton,
  Form,
} from "../GlobalStyles/globalStyles";
import "../GlobalStyles/button.css";

const Signup = ({ signup, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",
  });

  const [accountCreated, setAccountCreated] = useState(false);

  const { name, email, password, re_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (password === re_password) {
      signup({ name, email, password, re_password });
      setAccountCreated(true);
    }
  };

  if (isAuthenticated) return <Redirect to="/dashboard" />;
  if (accountCreated) return <Redirect to="/login" />;

  return (
    <Container>
      <MainText>Sign Up</MainText>
      <SmallText>Create your Account</SmallText>
      <Form onSubmit={(e) => onSubmit(e)}>
        <div>
          <Input
            type="text"
            placeholder="Name*"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <Input
            type="email"
            placeholder="Email*"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <Input
            type="password"
            placeholder="Password*"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          />
        </div>
        <div className="form-group">
          <Input
            type="password"
            placeholder="Confirm Password*"
            name="re_password"
            value={re_password}
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          />
        </div>
        <LargeRuxButton
          className="rux-button"
          style={{ margin: "1rem" }}
          type="submit"
        >
          Register
        </LargeRuxButton>
      </Form>
      <SmallText>
        Already have an account? <ButtonLink to="/login">Sign In</ButtonLink>
      </SmallText>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(Signup);
