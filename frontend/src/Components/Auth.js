import React from "react";
import { Link } from "react-router-dom";
import { RuxButton } from "@astrouxds/rux-button";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import PropTypes from 'prop-types';


export default class Auth extends React.Component {
  state = {
    isLoggingIn: false,
    error: null,
    creds: {
      email: "",
      password: "",
    },
  };

  componentDidMount() {
    if (this.props.auth === "signup") {
      document
        .getElementById("loginButton")
        .addEventListener("click", this.signup);
    } else {
      document
        .getElementById("loginButton")
        .addEventListener("click", this.login);
    }
  }

  componentWillUnmount() {
    if (this.props.auth === "signup") {
      document
        .getElementById("loginButton")
        .removeEventListener("click", this.signup);
    } else {
      document
        .getElementById("loginButton")
        .removeEventListener("click", this.login);
    }
  }

  signup = (e) => {
    this.setState({
      ...this.state,
      isLoggingIn: true,
      error: null,
    });
    axios
      .post("http://127.0.0.1:5000/signup", this.state.creds)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        this.setState({
          ...this.state,
          isLoggingIn: false,
          error: null,
        });
        this.props.history.push("/dashboard")
      })
      .catch((error) => {
        console.error(error.response);
        this.setState({
          ...this.state,
          isLoggingIn: false,
          error: error.response,
        });
      });
  };

  login = (e) => {
    this.setState({
      ...this.state,
      isLoggingIn: true,
      error: null,
    });
    axios
      .post("http://127.0.0.1:5000/login", this.state.creds)
      .then((res) => {
        // console.log(res.data)
        localStorage.setItem("token", res.data.access_token);
        this.setState({
          ...this.state,
          isLoggingIn: false,
          error: null,
        });
        this.props.history.push("/dashboard")
      })
      .catch((error) => {
        console.error(error.response);
        this.setState({
          ...this.state,
          isLoggingIn: false,
          error: error.response,
        });
      });
  };

  handleChanges = (e) => {
    e.preventDefault();
    let newState = this.state;
    newState.creds[e.target.name] = e.target.value;
    this.setState(newState);
  };

  render() {
    return (
      <div className="auth-container">
        <form className="rux-form-field">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              {this.props.auth === "signup" ? <h1>Sign Up</h1> : <h1>Login</h1>}
            </Grid>
            <Grid item>
              {this.props.auth === "signup" ? (
                <p>
                  Already have an account? <Link to="/login">Log In</Link>
                </p>
              ) : (
                <p>
                  Don't have an account? <Link to="/signup">Sign up!</Link>
                </p>
              )}
            </Grid>
            <Grid item>
              <label for="auth-email-input" className="rux-form-field__label">
                Email
              </label>
              <input
                id="auth-email-input"
                name="email"
                type="email"
                className="input"
                onChange={this.handleChanges}
                value={this.state.email}
              />
            </Grid>
            <Grid item>
              <label
                for="auth-password-input"
                className="rux-form-field__label"
              >
                Password
              </label>
              <input
                id="auth-password-input"
                name="password"
                type="password"
                className="input"
                onChange={this.handleChanges}
                value={this.state.email}
              />
            </Grid>
            {this.state.error && (
              <Grid item>
                {this.props.auth === "signup" ? (
                  <p style={{ color: "rgb(255, 48, 48)" }}>
                    User Already Exists
                  </p>
                ) : (
                  <p>Email or password are not recognized.</p>
                )}
              </Grid>
            )}
            <Grid item>
              {!this.state.isLoggingIn ? (
                <rux-button id="loginButton" size="large">
                  {this.props.auth === "signup" ? "Sign Up" : "Login"}
                </rux-button>
              ) : (
                <rux-button
                  size="large"
                  // ref="disabledLoginButton"
                  disabled="true"
                >
                  {this.props.auth === "signup" ? "Sign Up" : "Login"}
                </rux-button>
              )}
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

Auth.propTypes = {
  history: PropTypes.object.isRequired,
  auth: PropTypes.string.isRequired,
}