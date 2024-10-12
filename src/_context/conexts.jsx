import React, { createContext,useContext, useState } from 'react';

export const MyContext = createContext();

const MyContextProvider = ({ children }) => {


  const [contextValue, setContextValue] = useState(false);   


  const value = {
    contextValue,
    setContextValue,
  };

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;