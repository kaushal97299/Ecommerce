const express = require('express');
const app = express();
const Review = require('../models/Review');
const AddProducts=require('../models/ProductSchema');


// Create a new review
app.post('/rew',  async (req, res) => {
  const {  rating, text } = req.body;

  // Basic validation
  if ( !rating || !text) {
    return res.status(403).json({ message: 'Please provide productId, rating, and text' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(401).json({ message: 'Rating must be between 1 and 5' });
  }

  try {
    const newReview = new Review({
      // productId,
      // userId: req.user._id,
      // userName: req.user.name,
      rating,
      text
    });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(405).json({ message: err.message });
  }
});









module.exports = app;