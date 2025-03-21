import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  
import axios from "axios";  
import { toast, ToastContainer } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";  
import "./Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
    gender: "",
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const validatePhone = (phone) => /^\d{10}$/.test(phone);
  const validatePassword = (password) => /^[A-Za-z]+@+\d+$/.test(password) && password.length >= 9;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("⚠️ Email and Password are required!");
      return;
    }
    if (!validateEmail(formData.email)) {
      toast.error("❌ Invalid email format!");
      return;
    }
    if (!validatePhone(formData.phone)) {
      toast.error("❌ Phone number must be exactly 10 digits!");
      return;
    }
    if (!validatePassword(formData.password)) {
      toast.error("❌ Password must be at least 9 characters, contain letters first, then '@', and end with numbers!");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("❌ Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("https://ecommerce-atbk.onrender.com/api/auth/signup", formData);

      if (response.status === 200) {
        toast.success("✅ Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1000); 
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "❌ Signup failed. Please try again.");
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />  

      <h2 className="h">Signup</h2>

      <form onSubmit={handleSubmit}>
        <input className="in1" type="text" name="name" placeholder="Enter your Name" value={formData.name} onChange={handleChange} />
        <input className="in1" type="email" name="email" placeholder="Enter your Email" value={formData.email} onChange={handleChange} />
        <input className="in1" type="number" name="phone" placeholder="Enter your Phone Number" value={formData.phone} onChange={handleChange} />
        <input className="in1" type="password" name="password" placeholder="Enter your Password" value={formData.password} onChange={handleChange} />
        <input className="in1" type="password" name="confirmPassword" placeholder="Confirm your Password" value={formData.confirmPassword} onChange={handleChange} />

        <div className="div1">
          <select name="role" value={formData.role} onChange={handleChange} className="in1">
            <option value="">Select Role</option>
            <option value="client">Client</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="div2">
          <select name="gender" value={formData.gender} onChange={handleChange} className="in1">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button className="but1" type="submit">Signup</button>
      </form>

      <p className="pp">Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}

export default Signup;
