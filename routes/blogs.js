const express = require('express');
const router = express.Router();

const {
  getAllBlogs,
  getBlog,
  postNewBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogs');

router.route('/').get(getAllBlogs).post(postNewBlog);

router.route('/:id').get(getBlog).put(updateBlog).delete(deleteBlog);

module.exports = router;
