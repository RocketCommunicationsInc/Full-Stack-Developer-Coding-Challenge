import React, {Component} from 'react';
import logo from '../logo.png';
import { RuxButton } from '@astrouxds/rux-button/rux-button.js';
import "../css/login.css";

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
               <input name="username" value={this.state.username} placeholder="Enter username" onChange={this.handleInputChange}/>
               <input name="password" value={this.state.password} placeholder="Enter password" onChange={this.handleInputChange}/>
               <rux-button onClick={this.login}>Login</rux-button>
               <rux-button onClick={this.register}>New User?</rux-button>
            </form>
         </div>
      )
   }
}

export default login;