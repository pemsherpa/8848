import React, { createContext, useState, useContext } from 'react';

const DiscountContext = createContext();

export const useDiscount = () => {
  return useContext(DiscountContext);
};

export const DiscountProvider = ({ children }) => {
  const [discount, setDiscount] = useState(0);

  const incrementDiscount = (value) => {
    setDiscount(prev => Math.min(prev + value, 30)); // Limit discount to 30%
  };

  return (
    <DiscountContext.Provider value={{ discount, incrementDiscount }}>
      {children}
    </DiscountContext.Provider>
  );
};
