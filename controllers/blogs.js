const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
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
// @access  Private
blogsRouter.post('/', async (req, res) => {
  const { title, author, url } = req.body;
  // const token = extractToken(req);

  console.log(req.token);

  if (!req.token)
    return res.status(401).json({
      error: 'User must be signed in to access this route',
    });

  const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);

  const user = await User.findById(decodedToken.id);

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
// @access  Private
blogsRouter.put('/:id', async (req, res) => {
  if (!req.token)
    return res.status(401).json({
      error: 'User must be signed in to perform this action',
    });

  const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);

  let blog = await Blog.findById(req.params.id);

  if (!blog) return res.status(404).json({ error: 'Blog not found' });

  if (blog.user.toString() !== decodedToken.id)
    return res
      .status(401)
      .json({ error: 'User is unauthorized to access this route' });

  blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: 'query',
  });

  res.send(blog);
});

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private
blogsRouter.delete('/:id', async (req, res) => {
  if (!req.token)
    return res.status(401).json({
      error: 'User must be signed in to perform this action',
    });

  const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);

  let blog = await Blog.findById(req.params.id);

  // console.log(blog.user.toString() === decodedToken.id);
  if (blog.user.toString() !== decodedToken.id)
    return res
      .status(401)
      .json({ error: 'User is unauthorized to access this route' });

  await blog.remove();

  res.status(200).json({ message: 'Blog has been removed' });
});

module.exports = blogsRouter;
