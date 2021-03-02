import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './components/pages/login';
import Register from './components/pages/register';
import Main from './components/pages/main';

function Router() {
   return <BrowserRouter>
      <Switch>
         <Route exact path="/">
            <Login/>
         </Route>
         <Route exact path="/register">
            <Register/>
         </Route>
         <Route exact path="/main">
            <Main/>
         </Route>
      </Switch>
   </BrowserRouter>
};

export default Router