const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const cors = require("cors");
require("dotenv").config();
const app = express();


app.use(express.json());
app.use(cors());
 // Store securely in environment variables
 const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
})
let otpDatabase = {}; 
const OTP_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes
// Endpoint to send OTP to the user's email

app.post("/send-otp", (req, res) => {
  const { email } = req.body;

  // Check if email is valid (basic validation)
  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  const otp = crypto.randomInt(100000, 999999);  // 6-digit OTP
  const otpTimestamp = Date.now(); 

  otpDatabase[email] = { otp, timestamp: otpTimestamp }; // Save OTP and timestamp
  // Send OTP to user's email
  const mailOptions = {
    from:`MyShopify  <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code for Verification", // Subject of the email
    text: `
    Hello,

    We received a request to verify your email address with an OTP (One-Time Password).

    Your OTP code is: ${otp}

    Please note:
    - This OTP is valid for 5 minutes only from the time it was sent.
    - If you did not request this OTP, please disregard this message.
    - For your security, do not share your OTP with anyone.

    If you are having trouble verifying, please reach out to our support team at MyShopify@yourcompany.com.

    Thank you for using our service!

    Best regards,
    MyShopify Team
    `, // Text message in the email body
  };

  // eslint-disable-next-line no-unused-vars
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: "Error sending OTP", error });
    } else {
      res.status(200).json({
        message: "OTP sent successfully",
        otpSentAt: otpTimestamp, // Send the time OTP was generated
      });
    }
  });
});
// Endpoint to verify OTP
app.post("/verify-otp", (req, res) => {
  const { email, enteredOtp } = req.body;

  if (!otpDatabase[email]) {
    return res.status(400).json({ message: "OTP not found for this email" });
  }

  const { otp, timestamp } = otpDatabase[email];

  // Check if OTP has expired
  const currentTime = Date.now();
  if (currentTime - timestamp > OTP_EXPIRY_TIME) {
    delete otpDatabase[email]; // Remove expired OTP from memory
    return res.status(400).json({ message: "OTP has expired. Please request a new one." });
  }

  // Validate the OTP
  if (otp === parseInt(enteredOtp)) {
    res.status(200).json({ message: "OTP Verified successfully" });
    delete otpDatabase[email]; // OTP successfully verified, remove from database
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
});




// **Signup Route**
app.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password, role, gender } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(409).json({ message: "User already exists" });

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
    const token = jwt.sign({ id: user._id, Role: user.role },process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ 
      message: "Login successful", 
      token, 
      user:{name:user.name, email:user.email, role:user.role, phone:user.phone,gender:user.gender, id:user.id},
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