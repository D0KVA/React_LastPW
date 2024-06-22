import React, { useContext, useState, useEffect } from 'react';
import { BasketContext } from '../BasketContext';
import OrderModal from './OrderModal';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Basket = () => {
  const { basket, removeFromBasket } = useContext(BasketContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [removedItemIds, setRemovedItemIds] = useState([]);
  const [total, setTotal] = useState(0);

  const calculateTotal = () => {
    return basket.reduce((total, product) => {
      return total + parseFloat(product.price);
    }, 0);
  };

  useEffect(() => {
    setTotal(calculateTotal());
  }, [basket]);

  useEffect(() => {
    if (removedItemIds.length > 0) {
      const timer = setTimeout(() => {
        setRemovedItemIds([]);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [removedItemIds]);

  const handlePlaceOrder = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitOrder = (formData) => {
    const emailData = {
      lastName: formData.lastName,
      firstName: formData.firstName,
      middleName: formData.middleName,
      email: formData.email,
      address: formData.address,
      products: basket.map(product => `${product.name} - ${product.price}`).join('\n'),
    };

    emailjs.send('service_umtjjpl', 'template_5r9s9pg', emailData, 'pup86dC1l_rjFZk2g')
      .then((response) => {
        console.log('Email sent:', response.status, response.text);
        clearBasket();
      })
      .catch((error) => {
        console.error('Email error:', error);
      });
  };

  const clearBasket = () => {
    basket.forEach(product => removeFromBasket(product.id));
    setIsModalOpen(false); 
  };

  const handleRemoveFromBasket = (productId) => {
    setRemovedItemIds([...removedItemIds, productId]);
    setTimeout(() => {
      removeFromBasket(productId);
    }, 500);
  };

  return (
    <div>
      <h2 className='basket_name'>Корзина</h2>
      {basket.length > 0 ? (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ul className='product_list'>
            {basket.map(product => (
              <motion.li key={product.id} initial={{ opacity: 1 }} animate={removedItemIds.includes(product.id) ? { opacity: 0, height: 0 } : { opacity: 1, height: 'auto' }} transition={{ duration: 0.5 }} style={{ marginBottom: '25px', display: 'flex', alignItems: 'center' }}>
                <img src={product.image} alt={product.name} width="150" style={{ marginRight: '20px' }} />
                <div style={{ flexGrow: 1 }}>
                  <span style={{ fontWeight: 'bold', fontSize:'24px' }}>{product.name}</span>
                  <br />
                  <motion.span style={{ fontWeight: 'bold', fontSize: '24px', color: removedItemIds.includes(product.id) ? 'red' : 'black' }} animate={{ textDecoration: removedItemIds.includes(product.id) ? 'line-through' : 'none' }}>
                    {product.price}
                  </motion.span>
                </div>
                <div style={{ marginLeft: '450px', marginRight: '20px' }}>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <img src="https://cdn.ananasposter.ru/image/cache/catalog/poster/chb/4750-1000x830.jpg" alt="Удалить" style={{ cursor: 'pointer', width:'32px', height:'32px'}} onClick={() => handleRemoveFromBasket(product.id)}/>
                  </motion.div>
                </div>
              </motion.li>
            ))}
          </ul>
          <div style={{ textAlign: 'center', marginRight: '210px'}}>
            <h4 style={{ display: 'flex', justifyContent: 'space-between'}}>
              <span>Общая цена: </span>
              <motion.span style={{ fontSize: '24px' }} animate={{ opacity: removedItemIds.length > 0 ? 0 : 1 }}>
                {total.toFixed(0)}
              </motion.span>
            </h4>
            <button className='orderBtn' onClick={handlePlaceOrder}>Оплатить заказ</button>
          </div>
        </div>
      ) : (
        <p style={{ textAlign: 'center', fontSize: '22px' }}>Твоя корзина пуста</p>
      )}
      <OrderModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitOrder} />
    </div>
  );
};

export default Basket;