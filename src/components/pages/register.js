import React, {Component} from 'react';
import logo from '../logo.png';
import '@astrouxds/rux-button/rux-button.js';
import '../css/login.css';
import { BrowserRouter, Link } from 'react-router-dom';

class register extends Component{
   state = {
      username: "",
      email: "",
      password: "",
      password2: "",
   }

   handleNameChange = (event) => {
      const {value} = event.target;
      this.setState({username: value});
   }

   handleEmailChange = (event) => {
      const {value} = event.target;
      this.setState({email: value});
   }

   handlePassChange = (event) => {
      const {value} = event.target;
      this.setState({password: value});
   }

   handlePassChange2 = (event) => {
      const {value} = event.target;
      this.setState({password2: value});
   }

   render(){
      return(
         <div>
            <img className="logo" src={logo} alt="Logo"/>
            <form className="login">
               <h1>REGISTER</h1>
               <input name="username" value={this.state.username} placeholder="Enter username" onChange={this.handleNameChange}/>
               <input name="email" value={this.state.email} placeholder="Enter email" onChange={this.handleEmailChange}/>
               <input name="password" type="password" value={this.state.password} placeholder="Enter password" onChange={this.handlePassChange}/>
               <input name="password2" type="password" value={this.state.password2} placeholder="Confirm password" onChange={this.handlePassChange2}/>
               <rux-button onClick={this.register}>Register</rux-button>
               <rux-button><Link to="/">Returning User?</Link></rux-button>
            </form>
         </div>
      )
   }
}

export default register;