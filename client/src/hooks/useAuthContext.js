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
  const [error, setError] = useState(null);

  const login = async (email, password, remember) => {
    const userLoggingIn = { email, password, remember };
    await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(userLoggingIn),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => setError(error));
  };

  const signup = async (email, name, password) => {
    const newUser = { email, name, password };
    await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((error) => setError(error));
  };

  const logout = async () => {
    await fetch("http://localhost:5000/api/logout")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => setError(error));
    if (error) {
      return error;
    }
  };

  return { user, error, login, signup, logout };
}
