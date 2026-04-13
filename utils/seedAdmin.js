const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

// Create default admin user if not exists
const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (!adminExists) {
      const adminUser = new User({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
      });
      
      await adminUser.save();
      console.log('Default admin user created');
    }
  } catch (error) {
    console.error('Error creating default admin:', error.message);
  }
};

module.exports = createDefaultAdmin;
