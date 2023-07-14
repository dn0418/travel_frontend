// MyContext.tsx
import React, { createContext, useContext, useState } from 'react';

// Define the type for your context value
type ContextValueType = {
  currencyValue: string;
  handleGlobalCurrencyChange: (newValue: string) => void;
};

// Create the context
const GlobalContext = createContext<ContextValueType | undefined>(undefined);

// Create a custom hook to access the context
export const useGlobalContext = (): ContextValueType => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};

// Create a provider component to wrap your app
export const GlobalContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currencyValue, setCurrencyValue] = useState('dollar');

  // Define any functions or state you want to share
  const handleGlobalCurrencyChange = (newValue: string) => {
    setCurrencyValue(newValue);
  };

  // Pass the state and functions through the context
  const contextValue: ContextValueType = {
    currencyValue: currencyValue,
    handleGlobalCurrencyChange: handleGlobalCurrencyChange,
  };

  return (
    <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>
  );
};
