/** @format */

import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import {
  Container,
  MainText,
  SmallText,
  Input,
  ButtonLink,
  Form,
  LargeRuxButton,
} from "../GlobalStyles/globalStyles";
import "../GlobalStyles/button.css";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    login(email, password);
  };

  if (isAuthenticated) return <Redirect to="/dashboard" />;

  return (
    <Container>
      <MainText>Sign In</MainText>
      <SmallText>Sign into your Account</SmallText>
      <Form onSubmit={(e) => onSubmit(e)}>
        <div>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          />
        </div>
        <LargeRuxButton className="rux-button" type="submit">
          Login
        </LargeRuxButton>
      </Form>
      <SmallText>
        Don't have an account? <ButtonLink to="/signup">Sign Up</ButtonLink>
      </SmallText>
      <SmallText>
        Forgot your Password?{" "}
        <ButtonLink to="/reset_password">Reset Password</ButtonLink>
      </SmallText>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
