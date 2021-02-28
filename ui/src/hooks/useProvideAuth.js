import { useState } from 'react';
import { getUsers } from '../services/userService.js';

const authenticator = {
  isAuthenticated: false,
  signIn(username, password, postAuthSuccess) {
    //TODO database reqquest
    // then
    console.log("in signIn");
    getUsers();
    this.isAuthenticated = true;

    postAuthSuccess();
  },
  logout(postLogout) {
    // TODO: in the real world there would be a session cookie set and 
    //    an expiration time in the cookie, so this function would 
    //    invalidate the cookie
    this.isAuthenticated = false;
    postLogout();
  }
}

const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  const authenticate = ({ username, password }, redirectToRequestedPage) => {
    console.log("in authenticate");
    return authenticator.signIn(username, password, () => {
      // TODO: figure this out --> setUser()
      redirectToRequestedPage();
    });
  };

  const logout = (leaveSecuredPage) => {
    return authenticator.logout(() => {
      // TODO: figure this out --> setUser()
      leaveSecuredPage();
    });
  };

  return {
    session: localStorage.getItem("session_token"),
    authenticate,
    logout
  }
};

export default useProvideAuth;