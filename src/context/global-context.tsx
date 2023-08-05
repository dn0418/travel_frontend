// MyContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import client from '../rest-api/client';

// Define the type for your context value
type ContextValueType = {
  currencyValue: string;
  handleGlobalCurrencyChange: (newValue: string) => void;
  convertCurrency: (amount: number) => string;
};

interface CurrencyRate {
  code: string;
  rate: number;
}

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
  const [currencyValue, setCurrencyValue] = useState('amd');
  const [currencyRates, setCurrencyRates] = useState<CurrencyRate[]>([]);

  // Define any functions or state you want to share
  const handleGlobalCurrencyChange = (newValue: string) => {
    setCurrencyValue(newValue);
  };

  const convertCurrency = (amount: number) => {
    if (currencyValue === 'usd') {
      const findRate = currencyRates.find((rate: CurrencyRate) => rate.code === 'usd');
      if (findRate) {
        const total = amount * findRate.rate;
        return `$${total}`;
      }
    } else if (currencyValue === 'ruble') {
      const findRate = currencyRates.find((rate: CurrencyRate) => rate.code === 'ruble');
      if (findRate) {
        const total = amount * findRate.rate;
        return `₽${total}`;
      }
    }

    return `֏${amount}`;
  };

  // Pass the state and functions through the context
  const contextValue: ContextValueType = {
    currencyValue: currencyValue,
    handleGlobalCurrencyChange: handleGlobalCurrencyChange,
    convertCurrency: convertCurrency
  };

  useEffect(() => {
    const fetchCurrencyRates = async () => {
      try {
        const response: any = await client.currency.all();
        setCurrencyRates(response?.data)
      } catch (error) {
        console.error("Failed to fetch currency rates", error);
      }
    };

    fetchCurrencyRates();
  }, []);

  return (
    <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>
  );
};
