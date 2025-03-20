const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();
const app = express.Router();
const SECRET_KEY = "sharmakaushal"; // Store securely in environment variables

// **Signup Route**
app.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password, role, gender } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ name, email, phone, password, role, gender }); // Storing password as plain text (⚠️ Not Secure)
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// **Login Route**
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, Role: user.role },process.env. SECRET_KEY, { expiresIn: "1h" });

    res.json({ 
      message: "Login successful", 
      token, 
      user:{name:user.name, email:user.email, role:user.role, phone:user.phone,id:user.id},
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
 
app.get('/users', async (req, res) => {
  try {
      const users = await User.find({}).select('-password');
      res.json({
          success: true,
          users
      });
  } catch (error) {
      console.error('Get users error:', error);
      res.status(500).json({
          success: false,
          message: 'Error fetching users'
      });
  }
});
app.delete("/:id", async (req, res) => {
  try {
    const order = await User.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "❌ User not found" });
    }
    res.status(200).json({ message: "✅ User deleted successfully", order });
  } catch (error) {
    res.status(500).json({ message: "❌ Failed to delete User", error: error.message });
  }
});


// **User Profile Route (POST)**
app.post("/profile",  async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password from response
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;