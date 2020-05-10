const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');

blogsRouter.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({});

    res.send(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'something went wrong' });
  }
});

blogsRouter.post('/', async (req, res) => {
  try {
    const blog = new Blog(req.body);

    await blog.save();

    res.status(201).json(blog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'something went wrong' });
  }
});

module.exports = blogsRouter;
