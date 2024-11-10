// models/Field.js
const mongoose = require('mongoose');

// Define the schema for the 'Field' model
const fieldSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

// Create the model
const Field = mongoose.model('Field', fieldSchema);

module.exports = Field;
