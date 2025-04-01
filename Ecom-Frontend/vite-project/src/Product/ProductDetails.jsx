import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  // Get user from localStorage if exists
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      setLoading(true);
      try {
        // Fetch product details
        const productResponse = await axios.get(`http://localhost:4000/api/products/prod/${id}`);
        setProduct(productResponse.data);

        // Fetch reviews for this product
        // const reviewsResponse = await axios.get(`http://localhost:4000/api/reviews/${id}`);
        // setReviews(reviewsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error loading product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndReviews();

    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, [id]);

  const handleBuyNow = () => {
    navigate("/buy-now", { state: { product } });
  };

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const addToCart = () => {
    if (!product) return;

    const existingItem = cart.find((item) => item._id === product._id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    updateCart(updatedCart);
    toast.success("Product added to cart!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleReviewSubmit = async () => {
    if (!newReview.trim() || rating === 0) {
      toast.error("Please enter a review and select a rating.");
      return;
    }

    if (!user) {
      toast.error("Please login to submit a review");
      navigate("/login");
      return;
    }

    try {
      const reviewData = {
        productId: id,
        rating,
        text: newReview,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const response = await axios.post(
        "http://localhost:4000/api/reviews/rew",
        reviewData,
        config
      );

      // Add the new review to the beginning of the reviews array
      setReviews([response.data, ...reviews]);
      setNewReview("");
      setRating(0);
      toast.success("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error(error.response?.data?.message || "Failed to submit review");
      
      // If unauthorized, remove user and redirect to login
      if (error.response?.status === 401) {
        localStorage.removeItem("user");
        navigate("/login");
      }
    }
  };

  const renderStars = (selectedStars, setFunction) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        onClick={() => setFunction && setFunction(index + 1)}
        style={{
          cursor: setFunction ? "pointer" : "default",
          color: index < selectedStars ? "gold" : "gray",
          fontSize: "24px",
        }}
      >
        ★
      </span>
    ));
  };

  if (loading) {
    return <p className="loading">Loading product details...</p>;
  }

  if (!product) {
    return <p className="error">Product not found.</p>;
  }

  const discountedPrice = (product.price - (product.price * (product.discount / 100))).toFixed(2);

  return (
    <div className="container mt-20 product-detail">
      <div className="row">
        <div className="col-md-5">
          <img
            src={`http://localhost:4000/uploads/${product.image}`}
            alt={product.name}
            className="product-image img-fluid rounded shadow-sm"
          />
        </div>
        <div className="col-md-7">
          <div className="product-info">
            <h2 className="product-name mb-3">{product.pname}</h2>
            <p className="product-price text-success fs-4">
              ₹{discountedPrice}
              {product.discount > 0 && (
                <span className="text-danger ms-3 fs-5">
                  <del>₹{product.price}</del> {product.discount}% OFF
                </span>
              )}
            </p>
            <ul className="product-details list-unstyled">
              <li><strong>Category:</strong> {product.category || "N/A"}</li>
              <li><strong>Brand:</strong> {product.brand || "N/A"}</li>
              <li><strong>Offer Ends On:</strong> {product.offerEndDate ? new Date(product.offerEndDate).toLocaleDateString() : "N/A"}</li>
            </ul>
            <p className="product-description mt-4">{product.description}</p>
            <div className="button-group mt-4">
              <button className="btn btn-primary me-2" onClick={addToCart}>🛒 Add to Cart</button>
              <button className="btn btn-warning" onClick={handleBuyNow}>⚡ Buy Now</button>
            </div>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="review-section mt-5">
        <h4>Customer Reviews</h4>

        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="review-item p-2 border rounded mb-2">
              <div className="d-flex justify-content-between align-items-center">
                <div>{renderStars(review.rating, null)}</div>
                <small className="text-muted">by {review.userName || "Anonymous"}</small>
              </div>
              <p className="mb-0 mt-2">{review.text}</p>
              <small className="text-muted">
                {new Date(review.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))
        )}

        {/* Add Review Form */}
        <div className="add-review mt-4">
          <h5>Add Your Review</h5>
          <div>{renderStars(rating, setRating)}</div>
          <textarea
            className="form-control mt-2"
            placeholder="Write your review..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            rows={4}
          />
          <button 
            className="btn btn-success mt-2" 
            onClick={handleReviewSubmit}
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;