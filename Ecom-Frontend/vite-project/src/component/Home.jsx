import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductCardList = ({ newProduct }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || {};
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/products/prod");
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
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const categories = ["All", ...new Set(products.map((product) => product.category))];
  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((product) => product.category === selectedCategory);

  const toggleFavorite = (product) => {
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
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="/src/image/offer.jpg" className="d-block w-100 carousel-img" alt="Offer" />
    </div>
    <div className="carousel-item">
      <img src="/src/image/free.jpg" className="d-block w-100 carousel-img" alt="Free" />
    </div>
    <div className="carousel-item">
      <img src="/src/image/freer.jpg" className="d-block w-100 carousel-img" alt="Freer" />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

      {/* Product List */}
      <div className="product-list-container">
        <h2 className="produ">Product List</h2>
        <div className="category-buttons">
          {categories.map((category) => (
            <button key={category} onClick={() => setSelectedCategory(category)} className={selectedCategory === category ? "active" : ""}>
              {category}
            </button>
          ))}
        </div>
        <div className="produc">
          {filteredProducts.map((product) => {
            const discountedPrice = product.finalPrice ?? product.price;

            return (
              <div key={product._id} className="card">
                <Link to={`/product/${product._id}`} className="card-link">
                  <div className="card-body">
                    <img src={`http://localhost:4000/uploads/${product.image}`} alt={product.pname} className="product-img" />
                    <h3>{product.pname}</h3>
                    <p className="product-price text-success fs-4">
                      ₹{discountedPrice}
                      {product.discount > 0 && (
                        <span className="text-danger ms-3 fs-5">
                          <del>₹{product.price}</del> {product.discount}% OFF
                        </span>
                      )}
                    </p>
                  </div>
                </Link>
                <button className="favorite-btn" onClick={() => toggleFavorite(product)}>
                  {favorites[product._id] ? <FaHeart className="favorite-icon active" /> : <FaRegHeart className="favorite-icon" />}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductCardList;
