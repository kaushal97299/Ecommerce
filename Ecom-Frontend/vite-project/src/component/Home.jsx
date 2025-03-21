import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Import heart icons

const ProductCardList = ({ newProduct }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [userId, setUserId] = useState(null);
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get("https://ecommerce-atbk.onrender.com/api/auth/users", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUserId(response.data.userId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://ecommerce-atbk.onrender.com/api/products/prod");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (newProduct) {
      setProducts((prev) => [...prev, newProduct]);
    }
  }, [newProduct]);

  useEffect(() => {
    if (userId) {
      const savedFavorites = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || {};
      setFavorites(savedFavorites);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem(`favorites_${userId}`, JSON.stringify(favorites));
    }
  }, [favorites, userId]);

  const categories = ["All", ...new Set(products.map((product) => product.category))];
  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((product) => product.category === selectedCategory);

  const toggleFavorite = (product) => {
    if (!userId) {
      alert("Please log in to save favorites.");
      return;
    }

    setFavorites((prev) => {
      const updatedFavorites = { ...prev };
      if (updatedFavorites[product._id]) {
        delete updatedFavorites[product._id];
      } else {
        updatedFavorites[product._id] = product;
      }
      return updatedFavorites;
    });
  };

  return (
    <>
      <div id="carouselExampleIndicators" className="carousel slide">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/src/image/offer.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/src/image/free.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/src/image/freer.jpg" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="con123">
        <h2 className="cls">Product List</h2>
        <div className="category-buttons">
          {categories.map((category) => (
            <button key={category} onClick={() => setSelectedCategory(category)} className={selectedCategory === category ? "active" : ""}>
              {category}
            </button>
          ))}
        </div>
        <div className="product2">
          {filteredProducts.map((product) => (
            <div key={product._id} className="card-container">
              <Link to={`/product/${product._id}`} className="card-link">
                <div className="card1">
                  <img src={`https://ecommerce-atbk.onrender.com/uploads/${product.image}`} alt={product.name} />
                  <h3 className="hh">{product.name}</h3>
                  <p className="pp3">Price: ₹{product.price}</p>
                  <p className="pp3">Discount: {product.discount}%</p>
                </div>
              </Link>
              <button className="favorite-btn" onClick={() => toggleFavorite(product)}>
                {favorites[product._id] ? <FaHeart className="favorite-icon active" /> : <FaRegHeart className="favorite-icon" />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductCardList;
