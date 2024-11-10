// models/DataPoint.js
const mongoose = require('mongoose');

// DataPoint Schema
const dataPointSchema = new mongoose.Schema({
  field: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Field',  // Reference to Field model
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Create the model from the schema
const DataPoint = mongoose.model('DataPoint', dataPointSchema);

module.exports = DataPoint;
