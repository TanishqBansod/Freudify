const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt'); // Add this line

const router = express.Router();

// Rest of your existing code remains the same...

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('======== LOGIN ATTEMPT ========');
    console.log('Received Email:', email);
    console.log('Received Password:', password);

    // Find user case-insensitive
    const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
    
    if (!user) {
      console.log('NO USER FOUND');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('USER FOUND:', {
      storedEmail: user.email,
      storedPasswordHash: user.password
    });

    // More explicit comparison
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('BCRYPT COMPARE RESULT:', isMatch);
    
    if (!isMatch) {
      console.log('PASSWORD MISMATCH');
      console.log('Received password:', password);
      console.log('Stored hashed password:', user.password);
      return res.status(401).json({ 
        message: 'Invalid credentials',
        details: {
          receivedPassword: password,
          storedPasswordHash: user.password
        }
      });
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

    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = router;