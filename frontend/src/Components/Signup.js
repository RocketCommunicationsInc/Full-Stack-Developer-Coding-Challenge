import React from "react";
import { Link } from "react-router-dom";
import { RuxButton } from "@astrouxds/rux-button";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

class SignUp extends React.Component {
  state = {
    isLoggingIn: false,
    error: null,
    creds: {
      email: "",
      password: "",
    },
  };

  componentDidMount() {
    document
      .getElementById("loginButton")
      .addEventListener("click", this.signup);
  }

  componentWillUnmount() {
    document
      .getElementById("loginButton")
      .removeEventListener("click", this.signup);
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
        localStorage.setItem('token', res.data.token);
        this.setState({
          ...this.state,
          isLoggingIn: false,
          error: null,
        });
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
        <form onSubmit={this.login} className="rux-form-field">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <h1>Sign Up</h1>
            </Grid>
            <Grid item>
              <p>
                Already have an account? <Link to="/login">Log In</Link>
              </p>
            </Grid>
            <Grid item>
              <label for="signup-email-input" className="rux-form-field__label">
                Email
              </label>
              <input
                id="signup-email-input"
                name="email"
                type="email"
                className="input"
                onChange={this.handleChanges}
                value={this.state.email}
              />
            </Grid>
            <Grid item>
              <label
                for="signup-password-input"
                className="rux-form-field__label"
              >
                Password
              </label>
              <input
                id="signup-password-input"
                name="password"
                type="password"
                className="input"
                onChange={this.handleChanges}
                value={this.state.email}
              />
            </Grid>
            {this.state.error && (
              <Grid item>
                <p style={{ color: "rgb(255, 48, 48)" }}>User Already Exists</p>
              </Grid>
            )}
            <Grid item>
              {!this.state.isLoggingIn ? (
                <rux-button id="loginButton" size="large">
                  Sign Up
                </rux-button>
              ) : (
                <rux-button
                  size="large"
                  ref="disabledLoginButton"
                  disabled="true"
                >
                  Sign Up
                </rux-button>
              )}
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default SignUp;
