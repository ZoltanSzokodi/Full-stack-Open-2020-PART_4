const Blog = require('../models/Blog');

exports.nonExistingId = async () => {
  const blog = new Blog({
    title: 'Will be deleted',
    author: 'Zoltan Szokodi',
    url: 'https://myblog.com/todelete',
    likes: 42,
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

exports.blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};
