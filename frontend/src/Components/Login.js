import React from "react";
import { Link } from "react-router-dom";
import { RuxButton } from "@astrouxds/rux-button";
import Grid from "@material-ui/core/Grid";

class Login extends React.Component {
  state = {
    creds: {
      email: "",
      password: "",
    },
  };

  componentDidMount() {
    this.props.email &&
      this.setState({
        creds: {
          email: this.props.email,
        },
      });
  }

  handleChanges = (e) => {
    e.preventDefault();
    this.setState({
      creds: {
        ...this.state.creds,
        [e.target.name]: e.target.value,
      },
    });
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
              <h1>Login</h1>
            </Grid>
            <Grid item>
              <p>
                Don't have an account? <Link to="/signup">Sign up!</Link>
              </p>
            </Grid>
            <Grid item>
              <label for="login-email-input" className="rux-form-field__label">
                Email
              </label>
              <input
                id="login-email-input"
                name="email"
                type="email"
                className="input"
                onChange={this.handleChanges}
                value={this.state.email}
              />
            </Grid>
            <Grid item>
              <label
                for="login-password-input"
                className="rux-form-field__label"
              >
                Password
              </label>
              <input
                id="login-password-input"
                name="password"
                type="password"
                className="input"
                onChange={this.handleChanges}
                value={this.state.email}
              />
            </Grid>

            {this.props.error && (
              <Grid item>
                <p>Email or password are not recognized.</p>
              </Grid>
            )}
            <Grid item>
              <rux-button size="large" ref="loginButton">
                Login
              </rux-button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default Login;
