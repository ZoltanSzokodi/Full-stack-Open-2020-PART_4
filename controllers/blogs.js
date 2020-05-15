const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
require('express-async-errors');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 });

  res.send(blogs);
});

// @desc    Get a single blog
// @route   GET /api/blogs/:id
// @access  Public
blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) return res.status(404).json({ error: 'Blog not found' });

  res.send(blog);
});

// @desc    Post a new blog
// @route   POST /api/blogs
// @access  Public
blogsRouter.post('/', async (req, res) => {
  const { title, author, url, userId } = req.body;

  const user = await User.findById(userId);

  const blog = new Blog({
    title,
    author,
    url,
    user: user._id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
});

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Public
blogsRouter.put('/:id', async (req, res) => {
  let blog = await Blog.findById(req.params.id);

  if (!blog) return res.status(404).json({ error: 'Blog not found' });

  blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: 'query',
  });

  res.send(blog);
});

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Public
blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: 'Blog has been removed' });
});

module.exports = blogsRouter;
