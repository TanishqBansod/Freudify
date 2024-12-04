const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Dream Schema
const Dream = require('../models/Dream');
const User = require('../models/User');

// Middleware for checking authentication
const protect = async (req, res, next) => {
  let token;

  // Check if token is present in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from the header
      token = req.headers.authorization.split(' ')[1];
      
      // Decode the token to get the user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Attach the user to the request object
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Define the Dream Schema
const dreamSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Dream model
const DreamModel = mongoose.model('Dream', dreamSchema);

// Route to submit a new dream
router.post('/', protect, async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Please provide dream text' });
  }

  try {
    const newDream = new DreamModel({
      user: req.user.id, // Use the authenticated user ID
      text
    });

    await newDream.save(); // Save the dream to the database

    res.status(201).json(newDream); // Respond with the new dream
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to get all dreams of the authenticated user
router.get('/', protect, async (req, res) => {
  try {
    const dreams = await DreamModel.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(dreams); // Respond with the dreams
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
