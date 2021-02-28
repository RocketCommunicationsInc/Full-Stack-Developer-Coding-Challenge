import React, {Component} from 'react';
import logo from '../logo.png';
import '@astrouxds/rux-button/rux-button.js';
import '../css/login.css';
import { BrowserRouter, Link } from 'react-router-dom';

class login extends Component{
   state = {
      email: "",
      password: "",
   }

   handleEmailChange = (event) => {
      const {value} = event.target;
      this.setState({email: value});
   }

   handlePassChange = (event) => {
      const {value} = event.target;
      this.setState({password: value});
   }

   render(){
      return(
         <div>
            <img className="logo" src={logo} alt="Logo"/>
            <form className="login">
               <h1>LOGIN</h1>
               <input name="email" value={this.state.email} placeholder="Enter email" onChange={this.handleEmailChange}/>
               <input name="password" type="password" value={this.state.password} placeholder="Enter password" onChange={this.handlePassChange}/>
               <rux-button onClick={this.login}>Login</rux-button>
               <rux-button><Link to="/register">New User?</Link></rux-button>
            </form>
         </div>
      )
   }
}

export default login;