const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: false
  },
}, {
  timestamps: true, 
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
