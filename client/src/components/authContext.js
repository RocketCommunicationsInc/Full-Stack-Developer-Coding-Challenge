import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

const AuthContext = createContext()

function AuthContextProvider(){
   const [loggedIn, setLoggedIn] = useState(undefined);

   async function getLoggedIn(){
      const loggedInRes = await axios.get("http://localhost:3001/auth/loggedIn");
      setLoggedIn(loggedInRes.data);
   }

   useEffect(() => {
      getLoggedIn()
   }, [])

   return<AuthContext.Provider value={{loggedIn, getLoggedIn}}>
      {props.children}
   </AuthContext.Provider>
}

export default AuthContext;
export {AuthContextProvider};