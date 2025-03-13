const express = require('express');
const connectDB = require('../backend/db');
const cors = require('cors');
const dataRoutes = require('../backend/routes/dataRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/data', dataRoutes);

// Server listening on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
