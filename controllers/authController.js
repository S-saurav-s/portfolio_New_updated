const User = require('../models/User');

// @desc    Show login page
// @route   GET /auth/login
exports.getLogin = (req, res) => {
  res.render('auth/login', { 
    title: 'Admin Login',
    error: null 
  });
};

// @desc    Handle login
// @route   POST /auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
  return res.render('auth/login', { error: 'Please provide username and password' });
}

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('auth/login', { 
        title: 'Admin Login',
        error: 'Invalid credentials' 
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.render('auth/login', { 
        title: 'Admin Login',
        error: 'Invalid credentials' 
      });
    }

    // Set session
    req.session.isAdmin = true;
    req.session.userId = user._id;
    
    res.redirect('/admin/projects');
  } catch (error) {
    console.error(error);
    res.render('auth/login', { 
      title: 'Admin Login',
      error: 'Server error. Please try again.' 
    });
  }
};

// @desc    Handle logout
// @route   POST /auth/logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/');
  });
};
