import React, { useContext, useEffect, useState } from 'react';
import { FavouriteContext } from '../FavouriteContext';

const Favourites = () => {
  const { favourites } = useContext(FavouriteContext);
  const [favouriteProducts, setFavouriteProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/media')
      .then(response => response.json())
      .then(data => {
        const favProducts = data.filter(product => favourites.includes(product.id));
        setFavouriteProducts(favProducts);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [favourites]);

  return (
    <div className="catalog-container">
      <h2 className='catalog_name'>Мои любимые продукты:</h2>
      <div className='catalog_container2'>
        {favouriteProducts.length > 0 ? (
          <ul className="product-list">
            {favouriteProducts.map(product => (
              <li key={product.id} className="product-item">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="product-price">{product.price}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className='catalog_found'>У вас нет любимых продуктов(((</p>
        )}
      </div>
    </div>
  );
};

export default Favourites;