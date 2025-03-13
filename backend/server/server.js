const path = require('path');
const dotenvPath = path.resolve(__dirname, '../.env');
console.log('Looking for .env file at:', dotenvPath);
require('dotenv').config({ path: dotenvPath });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('../routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Fallback MongoDB URI if environment variable is not loaded
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/farelytic';
console.log('Using MongoDB URI:', mongoURI ? 'URI configured' : 'URI missing');

// MongoDB connection - removed deprecated options
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));