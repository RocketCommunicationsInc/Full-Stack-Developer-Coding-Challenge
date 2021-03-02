import React, {useContext} from 'react';
import '@astrouxds/rux-button/rux-button.js';
import AuthContext from './authContext';

function LogOutBtn(){

   const {getLoggedIn} = useContext(AuthContext)

   async function logOut(){
      await axios.get("http://localhost:3001/auth/logout")
      getLoggedIn();
   }

   return <>
      <rux-button onClick={logOut}>Log Out</rux-button>
   </>
}

export default LogOutBtn