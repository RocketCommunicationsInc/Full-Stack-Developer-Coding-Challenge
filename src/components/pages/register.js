import React, {Component} from 'react';
import logo from '../logo.png';
import '@astrouxds/rux-button/rux-button.js';
import "../css/login.css";

class register extends Component{
   state = {
      username: "",
      password: "",
   }

   render(){
      return(
         <div>
            <img className="logo" src={logo} alt="Logo"/>
            <form className="login">
               <h1>REGISTER</h1>
               <input name="username" value={this.state.username} placeholder="Enter username" onChange={this.handleInputChange}/>
               <input name="password" value={this.state.password} placeholder="Enter password" onChange={this.handleInputChange}/>
               <rux-button onClick={this.register}>Register</rux-button>
               <rux-button onClick={this.login}>Returning User?</rux-button>
            </form>
         </div>
      )
   }
}

export default register;