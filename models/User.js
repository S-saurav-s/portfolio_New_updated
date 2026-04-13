const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', function(next) {
  const user = this;
  
  // Only hash if password is modified and not already hashed
  if (!user.isModified('password')) {
    return next();
  }
  
  // Check if password looks already hashed (bcrypt hashes start with $2a$, $2b$, or $2y$)
  if (user.password.startsWith('$2') && user.password.length === 60) {
    // Password is already hashed, skip
    return next();
  }
  
  try {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
