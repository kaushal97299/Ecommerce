import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import "./Home.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
    setFavorites(Object.values(savedFavorites)); // Convert object to array
  }, []);

  const removeFavorite = (productId) => {
    const updatedFavorites = favorites.filter((product) => product._id !== productId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites.reduce((acc, product) => ({ ...acc, [product._id]: product }), {})));
  };

  return (
    <>
      <div className="con123">
        <h2 className="cls">Your Favorite Products ❤️</h2>
        {favorites.length === 0 ? (
          <p className="empty-message">No favorite products yet! Start adding some.</p>
        ) : (
          <div className="product2">
            {favorites.map((product) => (
              <div key={product._id} className="card-container">
                <Link to={`/product/${product._id}`} className="card-link">
                  <div className="card1">
                    <img src={`http://localhost:4000/uploads/${product.image}`} alt={product.name} />
                    <h3 className="hh">{product.name}</h3>
                    <p className="pp3">Price: ${product.price}</p>
                  </div>
                </Link>
                {/* Remove Favorite Button */}
                <button className="favorite-btn" onClick={() => removeFavorite(product._id)}>
                  <FaHeart className="favorite-icon active" />
                </button>
              </div>
            ))}
          </div>
        )}
        <Link to="/" className="back-home">⬅ Back to Products</Link>
      </div>
    </>
  );
};

export default Favorites;
