import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

function Router() {
   return <BrowserRouter>
      <Switch>
         <Route exact path="/">
            <div>Login</div>
         </Route>
         <Route exact path="/register">
            <div>Register</div>
         </Route>
         <Route exact path="/main">
            <div>Main</div>
         </Route>
      </Switch>
   </BrowserRouter>
};

export default Router