import React, {useState, useContext} from 'react';
import axios from 'axios';
import logo from '../logo.png';
import '@astrouxds/rux-button/rux-button.js';
import '../css/login.css';
import {Link, Redirect} from 'react-router-dom';
import AuthContext from '../authContext';

function Register() {

   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [passwordVerify, setPasswordVerify] = useState("")
   
   async function register(e) {
      e.preventDefault();

      try{
         const registerData = {
            email, 
            password, 
            passwordVerify,
         };

         await axios.post(
            "http://localhost:3001/auth/", 
            registerData,
            {withCredentials: true},
         )

         const {getLoggedIn} = useContext(AuthContext);
         getLoggedIn();
         checkLoggedIn();

      }catch(err){
         console.error(err);
      }
   }

   function checkLoggedIn(){
      try{
         const {loggedIn} = useContext(AuthContext)
         if(loggedIn === true){
            return <Redirect to="/main"/>
         }
      }catch(err){
         console.error(err);
      }
   }

   return(
      <div>
         <img className="logo" src={logo} alt="Logo"/>
         <form className="login">
            <h1>REGISTER</h1>
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
            <input 
               type="password" 
               placeholder="Confirm password" 
               onChange={(e) => setPasswordVerify(e.target.value)} 
               value={passwordVerify}
            />
            <rux-button onClick={register}>Register</rux-button>
            <rux-button><Link to="/">Returning User?</Link></rux-button>
         </form>
      </div>
   )
   
}

export default Register;