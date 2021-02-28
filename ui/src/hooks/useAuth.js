import { createContext, useContext } from 'react';

const authContext = createContext();

const useAuth = () => {
  return useContext(authContext);
}

export {
  authContext,
  useAuth
}