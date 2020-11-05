import React from 'react';
import { Link } from 'react-router-dom';
import { RuxButton } from "@astrouxds/rux-button"


class Login extends React.Component {
  state = {
    creds: {
      email: '',
      password: ''
    }
  };

  componentDidMount() {
    this.props.email &&
      this.setState({
        creds: {
          email: this.props.email
        }
      });
  }
  handleChanges = e => {
    e.preventDefault();
    this.setState({
      creds: {
        ...this.state.creds,
        [e.target.name]: e.target.value
      }
    });
  };


  render() {
    return (
      <div className='login-container'>
        <form onSubmit={this.login}>
            <h1>Log In</h1>
            <p>
                Don't have an account? <Link to='/signup'>Sign up!</Link>
            </p>
            <input
                type='email'
                placeholder='Email'
                name='email'
                onChange={this.handleChanges}
                value={this.state.email}
            />
            <input
                type='password'
                placeholder='Password'
                name='password'
                onChange={this.handleChanges}
                value={this.state.password}
            />
            {
                this.props.error && <p>Email or password are not recognized.</p>
            }
            <rux-button size="large" ref="loginButton">Log In</rux-button>
         
        </form>
      </div>
    );
  }
}

export default Login