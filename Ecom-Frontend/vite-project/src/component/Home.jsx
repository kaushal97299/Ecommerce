import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./Home.css";

const ProductCardList = ({ newProduct }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || {});
  const [sortOrder, setSortOrder] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productRatings, setProductRatings] = useState({}); // Store ratings for each product
  const productsPerPage = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/products/prod");
        setProducts(response.data);
        setFilteredProducts(response.data);
        
        // Fetch ratings for all products
        fetchAllProductRatings(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Function to fetch ratings for all products
  const fetchAllProductRatings = async (products) => {
    const ratings = {};
    try {
      for (const product of products) {
        const response = await axios.get(`http://localhost:4000/api/reviews/rew/${product._id}`);
        const reviews = response.data;
        if (reviews.length > 0) {
          const total = reviews.reduce((sum, review) => sum + review.rating, 0);
          ratings[product._id] = (total / reviews.length).toFixed(1);
        } else {
          ratings[product._id] = 0;
        }
      }
      setProductRatings(ratings);
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };

  useEffect(() => {
    if (newProduct) {
      setProducts((prev) => [...prev, newProduct]);
      // Fetch rating for the new product
      fetchProductRating(newProduct._id);
    }
  }, [newProduct]);

  const fetchProductRating = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/reviews/rew/${productId}`);
      const reviews = response.data;
      if (reviews.length > 0) {
        const total = reviews.reduce((sum, review) => sum + review.rating, 0);
        const average = (total / reviews.length).toFixed(1);
        setProductRatings(prev => ({...prev, [productId]: average}));
      } else {
        setProductRatings(prev => ({...prev, [productId]: 0}));
      }
    } catch (error) {
      console.error("Error fetching rating:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    let updatedProducts = products;
    if (selectedCategory !== "All") {
      updatedProducts = products.filter((product) => product.category === selectedCategory);
    }
    if (searchQuery) {
      updatedProducts = updatedProducts.filter((product) =>
        product.pname.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredProducts(updatedProducts);
  }, [products, selectedCategory, searchQuery]);

  const categories = ["All", ...new Set(products.map((product) => product.category))];

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "lowToHigh") return (a.finalPrice ?? a.price) - (b.finalPrice ?? b.price);
    if (sortOrder === "highToLow") return (b.finalPrice ?? b.price) - (a.finalPrice ?? a.price);
    return 0;
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

  // Function to render star ratings
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="product-rating-stars">
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            return <span key={index} className="star filled">★</span>;
          } else if (index === fullStars && hasHalfStar) {
            return <span key={index} className="star half">★</span>;
          } else {
            return <span key={index} className="star">★</span>;
          }
        })}
        <span className="rating-text">({rating})</span>
      </div>
    );
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="con ">
      <div className="row">
        {/* Category Sidebar (3 Columns) */}
        <div className="col-md-2 cat">
          <h4 className="categ">Categories</h4>
          <ul className="list1">
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
        <div className="col-md-10 prodd">
          <h2 className="produ">Product List</h2>

          {/* Search Bar */}
          <div className="search2">
            <input
              type="text"
              className="form2"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sorting Dropdown */}
          <div className="price3">
            <h5>Sort by Price:</h5>
            <select className="form-select w-auto" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="">Default</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className="row1">
            {currentProducts.map((product) => {
              const discountedPrice = product.finalPrice ?? product.price;
              const averageRating = productRatings[product._id] || 0;
              
              return (
                <div key={product._id} className="claup">
                  <div className="card4 ">
                    <Link to={`/product/${product._id}`} state={{product,user}} className="card-link">
                      <img
                        src={`http://localhost:4000/uploads/${product.image}`}
                        alt={product.pname}
                        className=" product-img"
                      />
                    </Link>
                    <div className="carbody">
                      <h5 className="carditle" title={product.pname}>{product.pname}</h5>
                      
                      {/* Star Rating Display */}
                      <div className="product-rating">
                        {renderStars(averageRating)}
                      </div>
                      
                      <p className="cardext">
                        <span className="text-success fs-5">₹{discountedPrice}</span>
                        {product.discount > 0 && (
                          <span className="text-danger ms-2 fs-6">
                            <del>₹{product.price}</del> {product.discount}% OFF
                          </span>
                        )}
                      </p>
                      <p className="muted">Category: {product.category}</p>
                      <button className="favorite-btn" onClick={() => toggleFavorite(product)}>
                        {favorites[product._id] ? <FaHeart className="favorite-icon active" /> : <FaRegHeart className="favorite-icon" />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="pagina">
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            {[...Array(Math.ceil(sortedProducts.length / productsPerPage))].map((_, index) => (
              <button key={index} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(sortedProducts.length / productsPerPage)}
            >
              Next
            </button>
          </div>

          {/* No Products Message */}
          {currentProducts.length === 0 && <p className="text-center text-danger">No products found in this category.</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductCardList;