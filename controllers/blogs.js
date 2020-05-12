const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');
require('express-async-errors');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});

  res.send(blogs);
});

// @desc    Get a single post
// @route   GET /api/blogs/:id
// @access  Public
blogsRouter.get('/:id', async (req, res) => {
  const blogs = await Blog.find({});

  res.send(blogs);
});

// @desc    Post a new blog
// @route   POST /api/blogs
// @access  Public
blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body);
  await blog.save();

  res.status(201).json(blog);
});

module.exports = blogsRouter;
