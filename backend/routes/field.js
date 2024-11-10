// routes/fields.js
const express = require('express');
const Field = require('../models/Fields');
const router = express.Router();

// POST: Create a new field
router.post('/', async (req, res) => {
  const { name, description } = req.body;
  console.log(name,description)
  try {
    const newField = new Field({
      name,
      description
    });

    await newField.save();
    res.status(201).json(newField);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET: Get all fields
router.get('/', async (req, res) => {
  try {
    const fields = await Field.find();
    res.status(200).json(fields);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET: Get a field by its ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const field = await Field.findById(id);
    if (!field) return res.status(404).json({ message: 'Field not found' });
    res.status(200).json(field);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT: Update a field
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedField = await Field.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (!updatedField) return res.status(404).json({ message: 'Field not found' });
    res.status(200).json(updatedField);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE: Delete a field
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedField = await Field.findByIdAndDelete(id);
    if (!deletedField) return res.status(404).json({ message: 'Field not found' });
    res.status(200).json({ message: 'Field deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
