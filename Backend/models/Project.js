const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  image: {
    type: String,
    required: [true, 'Please add an image URL']
  },
  technologies: {
    type: [String], // Array of strings like ['React', 'Node.js']
    required: true
  },
  githubLink: {
    type: String,
    required: [true, 'Please add a GitHub link']
  },
  liveLink: {
    type: String,
    // Live link is optional, so we don't require it
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projectSchema);