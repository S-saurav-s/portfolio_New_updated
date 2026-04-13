const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a project title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a project description']
  },
  image: {
    type: String,
    default: '/images/default_projectImage.png'
  },
  technologies: {
    type: [String],
    default: []
  },
  projectUrl: {
    type: String,
    trim: true
  },
  githubUrl: {
    type: String,
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

projectSchema.index({ order: 1, createdAt: -1 });

module.exports = mongoose.model('Project', projectSchema);
