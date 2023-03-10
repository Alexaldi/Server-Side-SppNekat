import React, { useReducer, createContext } from "react";
import { initialState, AppReducer } from "./Reducer";

const AppContext = createContext([initialState, AppReducer]);
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
        {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };