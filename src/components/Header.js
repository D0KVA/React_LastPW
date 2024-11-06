import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="Headerchik">
      <div className="wrapper Headerchik_content">
        <div className="Headerchik_left">
          <Link to="/" className="Headerchik_logo">
            <motion.div className="DotaImage" whileHover={{ scale: 1.5}}>
              <img className="DotaImage_img" src="https://i.pinimg.com/originals/2d/cd/80/2dcd80c6f5a21a437313adde93b373d8.png" alt="poizonapp"/>
            </motion.div>
          </Link>
          <div className="Headerchik_Main">
            <Link className="Headerchik_Item" to="/">Главная страница</Link>
            <Link className="Headerchik_Item" to="/catalog">Категории товаров</Link>
            <a className="Headerchik_Item" href="#1337">О нас</a>
            <a className="Headerchik_Item" href="#support">Поддержка</a>
          </div>
        </div>
        <div className="Headerchik_right">
          <div className="search-container">
            <span className="search-icon">
              <img className="DotaImage_img" src="https://cdn-img.poizon.com/node-common/735b3e9e-33c1-5b37-8ad4-659f6a9a8058.svg" alt="search icon" />
            </span>
            <input
              className="input-search"
              maxLength={800}
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              placeholder="Поиск"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Link to="/basket">
              <img className="icon" src="https://www.link.kg/mobile/cartm.png" alt="Корзина" />
            </Link>
            <Link to="/favourites">
              <img className="icon" src="https://bogatyr.club/uploads/posts/2023-03/1678899895_bogatyr-club-p-serdtse-na-pustom-fone-foni-instagram-20.png" alt="Любимое" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
