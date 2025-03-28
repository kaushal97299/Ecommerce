import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductCardList = ({ newProduct }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || {});
  const [sortOrder, setSortOrder] = useState(""); // Sorting order

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

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((product) => product.category === selectedCategory);

  // Apply sorting only within the selected category
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "lowToHigh") return (a.finalPrice ?? a.price) - (b.finalPrice ?? b.price);
    if (sortOrder === "highToLow") return (b.finalPrice ?? b.price) - (a.finalPrice ?? a.price);
    return 0; // Default order
  });

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
    <div className="container mt-4">
      <div className="row">
        {/* Category Sidebar (3 Columns) */}
        <div className="col-md-3">
          <h4 className="category-title">Categories</h4>
          <ul className="list-group">
            {categories.map((category) => (
              <li
                key={category}
                className={`list-group-item ${selectedCategory === category ? "active" : ""}`}
                onClick={() => setSelectedCategory(category)}
                style={{ cursor: "pointer" }}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Product List (9 Columns) */}
        <div className="col-md-9">
          <h2 className="produ">Product List</h2>

          {/* Sorting Dropdown */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Sort by Price:</h5>
            <select className="form-select w-auto" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="">Default</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className="row">
            {sortedProducts.map((product) => {
              const discountedPrice = product.finalPrice ?? product.price;
              return (
                <div key={product._id} className="col-md-4 mb-4">
                  <div className="card product-card">
                    <Link to={`/product/${product._id}`} className="card-link">
                      <img src={`http://localhost:4000/uploads/${product.image}`} alt={product.pname} className="card-img-top product-img" />
                    </Link>
                    <div className="card-body">
                      <h5 className="card-title" title={product.pname}>{product.pname}</h5>
                      <p className="card-text">
                        <span className="text-success fs-5">₹{discountedPrice}</span>
                        {product.discount > 0 && (
                          <span className="text-danger ms-2 fs-6">
                            <del>₹{product.price}</del> {product.discount}% OFF
                          </span>
                        )}
                      </p>
                      <p className="text-muted">Category: {product.category}</p>

                      <button className="favorite-btn" onClick={() => toggleFavorite(product)}>
                        {favorites[product._id] ? <FaHeart className="favorite-icon active" /> : <FaRegHeart className="favorite-icon" />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* No Products Message */}
          {sortedProducts.length === 0 && <p className="text-center text-danger">No products found in this category.</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductCardList;
