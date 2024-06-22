import React, { createContext, useState, useEffect } from 'react';

export const BasketContext = createContext();

const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState(() => {
    const savedBasket = localStorage.getItem('basket');
    return savedBasket ? JSON.parse(savedBasket) : [];
  });

  const addToBasket = (product) => {
    setBasket((prevBasket) => {
      const updatedBasket = [...prevBasket, product];
      localStorage.setItem('basket', JSON.stringify(updatedBasket));
      return updatedBasket;
    });
  };

  const removeFromBasket = (productId) => {
    setBasket((prevBasket) => {
      const updatedBasket = prevBasket.filter(product => product.id !== productId);
      localStorage.setItem('basket', JSON.stringify(updatedBasket));
      return updatedBasket;
    });
  };

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket));
  }, [basket]);

  return (
    <BasketContext.Provider value={{ basket, addToBasket, removeFromBasket }}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketProvider;