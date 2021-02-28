import { useState } from 'react';

const authenticator = {
  isAuthenticated: false,
  signIn(postAuthSuccess) {
    //TODO database reqquest
    // then
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

  const authenticate = (redirectToRequestedPage) => {
    return authenticator.siginIn(() => {
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
};

export default useProvideAuth;