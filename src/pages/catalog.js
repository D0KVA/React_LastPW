import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FavouriteContext } from '../FavouriteContext';

const Catalog = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { favourites, toggleFavourite } = useContext(FavouriteContext);

  const categories = ["Ability Upgrade", "Physical Damage Upgrade", "Сonsumables", "Damage Upgrade", "Aura", "Heal", "Speed", "Refresh", "Lifesteal"];

  useEffect(() => {
    axios.get('http://localhost:3001/media')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data); 
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product =>
        product.category === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="catalog-container">
      <h2 className='catalog_name'>Вся продукция</h2>
      <div className='catalog_container2'>
        <div className="filter-container">
          <label htmlFor="category-select">Типы: </label>
          <select className='select1' id="category-select" onChange={handleCategoryChange} value={selectedCategory}>
            <option value="">All</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        {filteredProducts.length > 0 ? (
          <ul className="product-list">
            {filteredProducts.map((product, index) => (
              <motion.li key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="product-item"
              >
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p className="product-price">{product.price}</p>
                </Link>
                <button className="favourite-button" style={{ color: favourites.includes(product.id) ? 'red' : 'black' }} onClick={() => toggleFavourite(product)}>♡</button>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className='catalog_found'>Ничего не найдено</p>
        )}
      </div>
    </div>
  );
};

export default Catalog;