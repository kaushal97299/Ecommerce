import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const BuyNow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product || null;

  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch user ID
  useEffect(() => {
    const fetchUserId = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to place an order.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:4000/api/auth/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserId(response.data.userId);
      } catch (error) {
        console.error("Failed to fetch user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  // Remove product from the user's cart
  useEffect(() => {
    if (!userId || !product) return;

    const savedCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
    const updatedCart = savedCart.filter((item) => item._id !== product._id);
    localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
  }, [userId, product]);

  // Handle input changes
  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  // Validate form inputs
  const validateForm = () => {
    const { name, address, phone } = userDetails;
    const nameRegex = /^[A-Za-z\s]{3,50}$/;
    const addressRegex = /^[A-Za-z0-9\s,.-]{5,100}$/;
    const phoneRegex = /^\d{10}$/;

    if (!nameRegex.test(name)) {
      toast.error("Name should only contain letters & spaces (3-50 characters).");
      return false;
    }
    if (!addressRegex.test(address)) {
      toast.error("Address must be between 5-100 characters and can include letters, numbers, comma, dot.");
      return false;
    }
    if (!phoneRegex.test(phone)) {
      toast.error("Phone number must be exactly 10 digits.");
      return false;
    }
    return true;
  };

  // Handle order submission
  const handleOrderSubmit = async () => {
    const userId = localStorage.getItem("user");
    if (!userId) {
      toast.error("User not logged in. Please log in to proceed.");
      return;
    }

    if (!product) {
      toast.error("Invalid product. Please try again.");
      return;
    }

    if (!validateForm()) return;

    setLoading(true);

    const finalPrice = product.price - (product.price * (product.discount || 0)) / 100;

    const orderDetails = {
      userId,
      ...userDetails,
      product: { ...product, finalPrice },
      orderTime: new Date().toISOString(),
    };

    try {
      console.log("Sending Order Details:", orderDetails);
      const response = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" ,userId },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Order failed: ${errorData.message || "Please try again."}`);
        return;
      }

      toast.success("Order placed successfully! 🎉");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast.error("Error placing order. Please try again.");
      console.error("Order Error:", error);
    }

    setLoading(false);
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
      <div className="container mt-4">
        <h2 className="text-center">Buy Now</h2>
        <div className="row justify-content-center">
          <div className="col-md-10 card p-4 shadow-sm">
            <div className="row">
              <div className="col-md-5 text-center">
                <h4 className="mb-3">Product Details</h4>
                {product ? (
                  <>
                    <img
                      src={`http://localhost:4000/uploads/${product.image}`}
                      alt={product.pname}
                      className="img-fluid mb-3"
                      style={{ maxWidth: "200px" }}
                    />
                    <p><strong>Name:</strong> {product.pname}</p>
                    <p><strong>Price:</strong> ₹{product.price}</p>
                    <p><strong>Discount:</strong> {product.discount || 0}%</p>
                    <p><strong>Final Price:</strong> ₹{(product.price - (product.price * (product.discount || 0)) / 100).toFixed(2)}</p>
                  </>
                ) : (
                  <p className="text-danger">No product details available.</p>
                )}
              </div>
              <div className="col-md-7">
                <h4 className="mb-3">User Details</h4>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="form-control mb-3"
                  onChange={handleChange}
                  value={userDetails.name}
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  className="form-control mb-3"
                  onChange={handleChange}
                  value={userDetails.address}
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter your phone"
                  className="form-control mb-3"
                  onChange={handleChange}
                  value={userDetails.phone}
                />
                <button className="btn btn-success w-100" onClick={handleOrderSubmit} disabled={loading}>
                  {loading ? "Processing..." : "Confirm Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyNow;
