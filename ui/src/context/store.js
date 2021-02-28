import React, { createContext, useReducer } from 'react';

const initialState = {
  authenticated: false,
  username: ''
};

const store = createContext(initialState);
const { Provider } = store;

const reducer = (state, action) => {
  switch(action.type) {
    default:
      return initialState;
  };
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch}}>{children}</Provider>
}

export { store, StateProvider };
