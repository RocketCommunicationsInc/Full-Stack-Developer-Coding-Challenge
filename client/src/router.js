import React, {useContext} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './components/pages/login';
import Register from './components/pages/register';
import Main from './components/pages/main';
import AuthContext from './components/authContext';

function Router() {

   const {loggedIn} = useContext(AuthContext)

   return <BrowserRouter>
      <Switch>
         {loggedIn === false && <>
            <Route exact path="/">
               <Login/>
            </Route>
            <Route exact path="/register">
               <Register/>
            </Route>
         </>}
         {loggedIn === true && <>
            <Route exact path="/main">
               <Main/>
            </Route>
         </>}
      </Switch>
   </BrowserRouter>
};

export default Router