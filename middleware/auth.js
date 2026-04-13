const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.isAdmin) {
    return next();
  }
  res.redirect('/auth/login');
};

module.exports = { isAuthenticated };
