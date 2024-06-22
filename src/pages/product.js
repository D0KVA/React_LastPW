import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FavouriteContext } from '../FavouriteContext';
import { BasketContext } from '../BasketContext';
import { wrap } from 'framer-motion';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { favourites, toggleFavourite } = useContext(FavouriteContext);
  const { addToBasket } = useContext(BasketContext);

  useEffect(() => {
    axios.get(`http://localhost:3001/media/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  if (!product) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="product-container2">
      <img className="product-image2" src={product.image} alt={product.name} />
      <div className="product-details2">
        <h1>{product.name}</h1>
        <p className="product-price2">{product.price}</p>
        <button
          className="favourite-button2"
          style={{ color: favourites.includes(product.id) ? 'red' : 'black' }}
          onClick={() => toggleFavourite(product)}
        >
          ♡
        </button>
        <button className="cart-button2" onClick={() => addToBasket(product)}>
          Добавить в корзину
        </button>
        <div className="item-details">
          <h2>Описание предмета</h2>
          <p style={{ textWrap: wrap }}>{product.details}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;