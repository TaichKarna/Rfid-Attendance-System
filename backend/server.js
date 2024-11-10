const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const fieldRoutes = require('./routes/field');
const dataPointRoutes = require('./routes/datapoint');  // New import

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas connection string (ensure the correct cluster URL and credentials)
const dbURI = 'mongodb+srv://mandeep:FSo073lftWAlF9Vx@cluster0.ignfpnx.mongodb.net/spit?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI).then(() => {
  console.log('MongoDB connected successfully!');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Use the routes for handling API calls
app.use('/api/users', userRoutes);
app.use('/api/fields', fieldRoutes);
app.use('/api/dataPoints', dataPointRoutes);  // Register new dataPoint routes

// Handle invalid routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
