import React, {Component} from 'react';
import logo from '../logo.png';
import '@astrouxds/rux-button/rux-button.js';
import "../css/login.css";
import { BrowserRouter, Link } from 'react-router-dom';

class login extends Component{
   state = {
      username: "",
      password: "",
   }

   render(){
      return(
         <div>
            <img className="logo" src={logo} alt="Logo"/>
            <form className="login">
               <h1>LOGIN</h1>
               <input name="username" value={this.state.username} placeholder="Enter username" onChange={this.handleInputChange}/>
               <input name="password" value={this.state.password} placeholder="Enter password" onChange={this.handleInputChange}/>
               <rux-button onClick={this.login}>Login</rux-button>
               <rux-button><Link to="/register">New User?</Link></rux-button>
            </form>
         </div>
      )
   }
}

export default login;