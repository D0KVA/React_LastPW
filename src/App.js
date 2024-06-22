import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages";
import Catalog from "./pages/catalog";
import Favourites from "./pages/favourites";
import Basket from "./pages/basket";
import Product from "./pages/product";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FavouriteProvider from "./FavouriteContext";
import BasketProvider from "./BasketContext";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <FavouriteProvider>
      <BasketProvider>
        <Router>
          <div>
            <Helmet>
              <meta charSet="utf-8" />
              <title>DOTA SHOP</title>
              <meta name="description" content="Dota for doters" />
              <link rel="icon" href="https://toppng.com/uploads/preview/dota-2-logo-png-image-library-download-logo-11563058448psapfna0tj.png" />
            </Helmet>
            <Header onSearch={setSearchQuery} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog searchQuery={searchQuery} />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/basket" element={<Basket />} />
              <Route path="/product/:id" element={<Product />} />
            </Routes>
            <Footer/>
          </div>
        </Router>
      </BasketProvider>
    </FavouriteProvider>
  );
};

export default App;