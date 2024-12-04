const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt'); 

const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('======== LOGIN ATTEMPT ========');
    console.log('Received Email:', email);
    console.log('Received Password:', password);

    const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
    
    if (!user) {
      console.log('NO USER FOUND');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('USER FOUND:', { storedEmail: user.email });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('BCRYPT COMPARE RESULT:', isMatch);
    
    if (!isMatch) {
      console.log('PASSWORD MISMATCH');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('LOGIN ROUTE ERROR:', error);
    res.status(500).json({ message: 'Server error', error: error.toString() });
  }
});

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Generate token after user creation
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.toString() });
  }
});

module.exports = router;
