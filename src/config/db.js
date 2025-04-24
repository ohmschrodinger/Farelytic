const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MongoDB connection string is not provided. Please set MONGODB_URI environment variable.');
        }

        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            // These options are no longer needed in newer versions but won't harm
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        // Don't exit the process, let the application handle the error
        throw error;
    }
};

module.exports = connectDB; 