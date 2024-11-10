const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema for the user
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: (v) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v),
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value === this.password; // Password and confirmPassword must match
      },
      message: 'Passwords must match',
    },
  },
});



// Create the model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
