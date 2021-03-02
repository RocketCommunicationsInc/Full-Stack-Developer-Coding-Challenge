import React, {useState} from 'react';
import axios from 'axios';
import logo from '../logo.png';
import '@astrouxds/rux-button/rux-button.js';
import '../css/login.css';
import {Link} from 'react-router-dom';

function Login(){

   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   
   async function login(e) {
      e.preventDefault();

      try{
         const loginData = {
            email, 
            password,
         };

         await axios.post(
            "http://localhost:3001/auth/login", 
            loginData,
            {withCredentials: true},
         )
      }catch(err){
         console.error(err);
      }
   }

   return(
      <div>
         <img className="logo" src={logo} alt="Logo"/>
         <form className="login">
            <h1>LOGIN</h1>
            <input 
               type="email" 
               placeholder="Enter email" 
               onChange={(e) => setEmail(e.target.value)} 
               value={email}
            />
            <input 
               type="password" 
               placeholder="Enter password" 
               onChange={(e) => setPassword(e.target.value)} 
               value={password}
            />
            <rux-button onClick={login}>Login</rux-button>
            <rux-button><Link to="/register">New User?</Link></rux-button>
         </form>
      </div>
   )
}

export default Login;