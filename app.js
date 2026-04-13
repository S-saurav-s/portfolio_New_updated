const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const MongoStore = require('connect-mongo').default;


// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Method override middleware
app.use(methodOverride('_method'));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// EJS setup
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', './layouts/main');

// Session middleware
app.set("trust proxy", 1);
const isProduction = process.env.NODE_ENV === "production";
app.use(session({
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: false,
  
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions'
  }),

  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax"
  }
}));

// Flash messages middleware
app.use(flash());

// Make user session and flash messages available to all views
app.use((req, res, next) => {
  res.locals.isAdmin = req.session.isAdmin || false;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/admin/projects', require('./routes/projects'));
app.use('/admin/settings', require('./routes/settings'));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
