import { requestAccess } from '../services/userService.js';

const authenticator = {
  isAuthenticated: false,
  async signIn(username, password, postAuth) {
    let authenticationMessage;
    try {
      await requestAccess(username, password).then((response) => {
        authenticationMessage = response.data[0].message;
      });
    } catch(error) {

    }

    let tokenValue = null;
    if (authenticationMessage === "authenticated") {
      this.isAuthenticated = true;
      tokenValue = "fake_token_value";
    } 

    postAuth(this.isAuthenticated, tokenValue);
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

  const authenticate = ({ username, password }, requestedPath = '/') => {
    authenticator.signIn(username, password, (isAuthenticated, token) => {
      if (isAuthenticated) {
        localStorage.setItem("session_token", token);
        window.location.pathname = requestedPath;
      }
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