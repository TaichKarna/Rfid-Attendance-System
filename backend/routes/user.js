const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming the user model is in the models folder
const router = express.Router();

// Register user route
router.post('/signup', async (req, res) => {
    const { first_name, last_name, username, email, password, confirmPassword } = req.body;
  
    try {
      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Check if passwords match
      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user with hashed password
      const newUser = new User({
        first_name,
        last_name,
        username,
        email,
        password: hashedPassword, // Store the hashed password
        confirmPassword: hashedPassword, // You can choose not to store confirmPassword in DB
      });
  
      // Save user to the database
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error registering user', error: err.message });
    }
  });

// Login user route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      // Find user by email
      const user = await User.findOne({ email });
      console.log("Found user:", user); // Log the found user
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password Match:", isMatch); // Log the result of the password comparison
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Create JWT token
      const token = jwt.sign({ id: user._id }, "TaichiKarna", { expiresIn: '1h' });
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
      console.error("Error logging in:", err);
      res.status(500).json({ message: 'Error logging in', error: err.message });
    }
  });
  


// Get user profile route
router.get('/profile', async (req, res) => {
  try {
    // Assuming JWT token is sent in Authorization header
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password -confirmPassword'); // Exclude password fields

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user profile', error: err.message });
  }
});

module.exports = router;
