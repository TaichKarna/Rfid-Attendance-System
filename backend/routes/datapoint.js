// routes/dataPoint.js
const express = require('express');
const DataPoint = require('../models/DataPoint');
const router = express.Router();

// POST: Create a new DataPoint
router.post('/', async (req, res) => {
  const { field, longitude, latitude, value, unit } = req.body;

  try {
    // Create a new data point
    const newDataPoint = new DataPoint({
      field,
      longitude,
      latitude,
      value,
      unit,
    });

    await newDataPoint.save();
    res.status(201).json(newDataPoint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET: Get all DataPoints for a specific Field
router.get('/:fieldId', async (req, res) => {
  const { fieldId } = req.params;

  try {
    const dataPoints = await DataPoint.find({ field: fieldId }).populate('field');
    res.status(200).json(dataPoints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
