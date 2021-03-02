import React, {useContext} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import '@astrouxds/rux-button/rux-button.js';
import AuthContext from './authContext';

function LogOutBtn(){
   const {getLoggedIn} = useContext(AuthContext)
   const history = useHistory();

   async function logOut(){
      await axios.get("http://localhost:3001/auth/logout")
      await getLoggedIn();
      history.push("/");
   }

   return <>
      <rux-button onClick={logOut}>Log Out</rux-button>
   </>
}

export default LogOutBtn