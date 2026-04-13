const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  // Profile Information
  fullName: {
    type: String,
    default: 'Shivam'
  },
  title: {
    type: String,
    default: 'Full Stack Developer'
  },
  tagline: {
    type: String,
    default: 'I build exceptional digital experiences that make a difference.'
  },
  description: {
    type: String,
    default: 'Specializing in modern web technologies and clean code.'
  },
  profileImage: {
    type: String,
    default: '/images/profile-placeholder.jpg'
  },
  
  // Contact Information
  email: {
    type: String,
    default: 'shivam@example.com'
  },
  phone: {
    type: String,
    default: '+91 XXXXX XXXXX'
  },
  location: {
    type: String,
    default: 'Your City, Country'
  },
  
  // Social Links
  socialLinks: {
    github: {
      type: String,
      default: '#'
    },
    linkedin: {
      type: String,
      default: '#'
    },
    leetcode: {
      type: String,
      default: '#'
    }
  },
  
  // Skills
  skills: [{
    name: String,
    icon: String,
    image: String,
    order: Number
  }],
  
  // About Section
  aboutTitle: {
    type: String,
    default: 'Who Am I?'
  },
  aboutDescription: {
    type: String,
    default: `I'm a passionate full-stack developer with a strong foundation in modern web technologies. I love building applications that solve real-world problems and deliver exceptional user experiences.`
  },
  
  // What I Do List
  whatIDo: [{
    text: String,
    order: Number
  }],
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
