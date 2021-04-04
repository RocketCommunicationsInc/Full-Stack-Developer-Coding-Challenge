import React, { useState, createContext, useContext } from "react";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {

  return useContext(authContext);

};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const login = (email, password, remember) => {
    const userLoggingIn = { email, password, remember };
    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(userLoggingIn),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setUser(data)
      });

  };

  const signup = (email, name, password) => {
    const newUser = { email, name, password };
    fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(newUser),
    })
      .then((response) => response.json())
      .then((data) => 
      {
        console.log(data)
        setUser(data)
      });
  };

  const logout = () => {
    fetch("http://localhost:5000/api/logout")
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return {user, login, signup, logout}
};