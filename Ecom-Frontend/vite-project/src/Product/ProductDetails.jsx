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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://ecommerce-atbk.onrender.com/api/products/prod/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

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

    // Show toast notification
    toast.success("Product added to cart!", {
      position: "top-right",
      autoClose: 2000,
    });

    // Reload page to reflect changes
    
      window.location.reload();
  };

  if (loading) {
    return <p className="loading">Loading product details...</p>;
  }

  if (!product) {
    return <p className="error">Product not found.</p>;
  }

  const discountedPrice = (product.price - (product.price * (product.discount / 100))).toFixed(2);

  return (
    <div className="container mt-4 product-detail">
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
    </div>
  );
};

export default ProductDetail;
