const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const resetAdminPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD, salt);
    console.log('Password hashed successfully');

    // Use native MongoDB to insert directly (bypass Mongoose hooks)
    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');

    // Delete ALL existing admins
    await usersCollection.deleteMany({});
    console.log('Deleted all existing admin users');

    // Insert new admin directly
    await usersCollection.insertOne({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      createdAt: new Date()
    });

    console.log('✅ New admin user created successfully!');
    console.log(`Email: ${process.env.ADMIN_EMAIL}`);
    console.log(`Password: ${process.env.ADMIN_PASSWORD}`);
    console.log('\nYou can now login with these credentials!');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

resetAdminPassword();
