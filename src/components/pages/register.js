import React, {Component} from 'react';
import logo from '../logo.png';
import '@astrouxds/rux-button/rux-button.js';
import "../css/login.css";
import { BrowserRouter, Link } from 'react-router-dom';

class register extends Component{
   state = {
      username: "",
      password: "",
   }

   handleNameChange = (event) => {
      const {value} = event.target;
      this.setState({username: value});
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
               <h1>REGISTER</h1>
               <input name="username" value={this.state.username} placeholder="Enter username" onChange={this.handleInputChange}/>
               <input name="password" type="password" value={this.state.password} placeholder="Enter password" onChange={this.handlePassChange}/>
               <rux-button onClick={this.register}>Register</rux-button>
               <rux-button><Link to="/">Returning User?</Link></rux-button>
            </form>
         </div>
      )
   }
}

export default register;