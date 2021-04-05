import React, { useState, createContext, useContext } from "react";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

// sets api endpoint TODO: change to true environement variable
const ENV = "prod";

let apiEndpoint = "http://localhost:5000";

if (ENV === "prod") {
  apiEndpoint = "https://rocket-comms-challenge-api.herokuapp.com";
}

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = async (email, password, remember) => {
    const userLoggingIn = { email, password, remember };
    await fetch(`${apiEndpoint}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include",
      body: new URLSearchParams(userLoggingIn),
    })
      .then((response) => response.json())
      .then((data) => {
        data.name && setUser(data);
        data.error && setError(data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  const signup = async (email, name, password) => {
    const newUser = { email, name, password };
    await fetch(`${apiEndpoint}/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      credentials: "include",
      body: new URLSearchParams(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        data.name && setUser(data);
        data.error && setError(data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  const logout = async () => {
    await fetch(`${apiEndpoint}/api/logout`)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => setError(error));
    if (error) {
      return error;
    }
  };

  return { user, error, login, signup, logout };
}
