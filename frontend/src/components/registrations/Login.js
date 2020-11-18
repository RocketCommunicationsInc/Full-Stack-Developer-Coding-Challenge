import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import Starfield from '../Starfield'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      email: '',
      password: '',
      errors: ''
     };
  }
  componentWillMount() {
    return this.props.loggedInStatus ? this.redirect() : null
  }
handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };
handleSubmit = (event) => {
    event.preventDefault()
    const {username, email, password} = this.state
let user = {
      username: username,
      email: email,
      password: password
    }
    
    axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.props.handleLogin(response.data)
        this.redirect()
      } else {
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  };
redirect = () => {
    this.props.history.push('/')
  }
handleErrors = () => {
    return (
      <div>
        <ul>
        {this.state.errors.map(error => {
        return <li key={error}>{error}</li>
          })
        }
        </ul>
      </div>
    )
  }
render() {
    const {username, email, password} = this.state
return (
<div>
<Starfield />
<div className="auth">
      <div class="rux-form-field--small">
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Username"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <br></br>
          <br></br>
          <input
            placeholder="Email"
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <br></br>
          <br></br>
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <br></br>
          <br></br>
          <button className="rux-button" placeholder="submit" type="submit">Log In</button>
          <br></br>
          <div>
            or <Link to='/signup'>Sign Up</Link>
          </div>
          
          </form>
          <div>
          {
            this.state.errors ? this.handleErrors() : null
          }
        </div>
      </div>
      </div>
      </div>
    );
  }
}
export default Login;