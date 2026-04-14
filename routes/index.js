const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const SiteSettings = require('../models/SiteSettings');

// Make flash messages available to contact view
router.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// @desc    Home page with all projects
// @route   GET /
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({ featured: true }).sort({ order: 1, createdAt: -1 });
    const allProjects = await Project.find().sort({ order: 1, createdAt: -1 });
    
    // Get site settings
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings();
      await settings.save();
    }
    
    res.render('home', { 
      title: `${settings.fullName} - Portfolio`,
      featuredProjects: projects,
      allProjects: allProjects,
      settings: settings
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// @desc    About page
// @route   GET /about
router.get('/about', async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings();
      await settings.save();
    }
    res.render('about', { title: `About - ${settings.fullName}`, settings });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// @desc    Contact page
// @route   GET /contact
router.get('/contact', async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings();
      await settings.save();
    }
    res.render('contact', { title: `Contact - ${settings.fullName}`, settings });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// @desc    Handle contact form submission
// @route   POST /contact
router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const transporter = require("nodemailer").createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Portfolio: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });

    req.flash('success_msg', `Thank you ${name}! Your message has been sent.`);
    res.redirect('/contact');

  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error sending message. Please try again.');
    res.redirect('/contact');
  }
});

module.exports = router;
