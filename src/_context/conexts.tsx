import React, { createContext, useState, ReactNode } from 'react';

// Define the type for the context value
interface MyContextType {
  contextValue: boolean;
  setContextValue: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with a default value of undefined
export const MyContext = createContext<MyContextType | undefined>(undefined);

// Define the props for the provider
interface MyContextProviderProps {
  children: ReactNode;
}

const MyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  const [contextValue, setContextValue] = useState<boolean>(false);

  const value: MyContextType = {
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
