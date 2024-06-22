import React, { createContext, useState, useEffect } from 'react';

export const FavouriteContext = createContext();

const FavouriteProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(() => {
    const savedFavourites = localStorage.getItem('favourites');
    return savedFavourites ? JSON.parse(savedFavourites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (product) => {
    setFavourites((prevFavourites) => {
      if (prevFavourites.includes(product.id)) {
        return prevFavourites.filter(id => id !== product.id);
      } else {
        return [...prevFavourites, product.id];
      }
    });
  };

  return (
    <FavouriteContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouriteContext.Provider>
  );
};

export default FavouriteProvider;