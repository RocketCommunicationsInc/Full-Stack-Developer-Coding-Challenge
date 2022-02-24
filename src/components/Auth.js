import * as React from "react";
import { useState, createContext, useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axiosInstance from "../config/axiosApi";

const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [authed, setAuthed] = useState("");

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (access_token !== null) {
      axiosInstance.post('user/auth/', { access_token })
      .then((response) => {
        if(response.status === 200) setAuthed(response.data.username)
      })
      .catch(() => { });
    }
  });

  return {
    authed,
    login(username, password) {
      return new Promise((res, rej) => {
        axiosInstance
          .post('user/login/', { username, password })
          .then((response) => {
            if (response.status === 200) {
              setAuthed(username);
              axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
              localStorage.setItem('access_token', response.data.access);
              localStorage.setItem('refresh_token', response.data.refresh);
              res();
            }
          })
          .catch((response) => {
            rej(response.message);
          });
      });
    },
    register(username, email, password) {
      return new Promise((res, rej) => {
        axiosInstance
          .post('user/register/', { username, email, password })
          .then((response) => {
            if (response.status === 201) {
              window.location.href = '/login';
              res();
            } else {
              rej(response.message);
            }
          })
          .catch((response) => {
            rej(response.message);
          });
      });
    },
    logout() {
      return new Promise((res) => {
        axiosInstance.post('user/logout/', {
          "refresh_token": localStorage.getItem("refresh_token")
        }).then(() => {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          axiosInstance.defaults.headers['Authorization'] = null;
          setAuthed("");
          res();
        });          
      });
    },

  };
}

export function AuthProvider({ children }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function RequireAuth({ children }) {
  const { authed } = useAuth();
  const location = useLocation();

  return authed !== "" ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

export default function AuthConsumer() {
  return useContext(authContext);
}
