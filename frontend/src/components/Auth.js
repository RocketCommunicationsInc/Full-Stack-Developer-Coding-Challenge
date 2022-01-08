import * as React from "react";
import { useState, createContext, useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { API_SERVER } from "../config/constant";
import axios from "axios";

const authContext = createContext();

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
const options = {
  // credentials: 'same-origin',
  credentials: true,
  // headers: {
  //   'X-CSRF-TOKEN': getCookie('csrf_access_token'),
  // },
};

export const useAuth = () => {
  return useContext(authContext);
}

function useProvideAuth() {
  const [authed, setAuthed] = useState("");

  useEffect(() => {
    let mounted = true;
    if (authed !== "") {
      return;
    }
    axios.get(`/api/auth`, options).then(() => {
      if (mounted) {
        setAuthed(" ");
      }
    }).catch(() => {});
    return function cleanup() {
      mounted = false;
    }
  }, []);

  return {
    authed,
    checkAuth() {
      axios.get(`${API_SERVER}auth`, {withCredentials: true}).then(() => {
        setAuthed(" ");
      });
    },
    login(username, password) {
      return new Promise((res, rej) => {
        axios
          .post(`${API_SERVER}users/login`, { username, password })
          .then(({ data }) => {
            if (data.success) {
              setAuthed(data.user.username);
              res();
            } else {
              rej();
            }
          });
      });
    },
    logout() {
      return new Promise((res) => {
        axios.post(`${API_SERVER}users/logout`).then(() => {
          setAuthed("");
          res();
        });
      });
    },
    register(username, password) {
      return new Promise((res, rej) => {
        axios
          .post(`${API_SERVER}users/register`, { username, password })
          .then(({ data }) => {
            if (data.success) {
              setAuthed(data.username);
              res();
            } else {
              rej();
            }
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

  return authed !== '' ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

export default function AuthConsumer() {
  return useContext(authContext);
}
