const mongoose = require('mongoose');
const createDefaultAdmin = require('../utils/seedAdmin');

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('MONGO_URI exists:', !!process.env.MONGO_URI);
    
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Create default admin user
    await createDefaultAdmin();
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.error('Full error:', error);
    // Don't exit - let the server try to continue
    console.log('Server will continue without database connection...');
  }
};

module.exports = connectDB;
