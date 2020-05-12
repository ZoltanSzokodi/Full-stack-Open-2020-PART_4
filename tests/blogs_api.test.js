const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app.js');
const api = supertest(app);
const Blog = require('../models/Blog');
const initialBlogs = require('./data_for_testing').blogs;

// TO RUN TEST ONLY HERE -> "$ npm test -- tests/blogs_api.test.js"

// Before running the test reset the test-collection in the DB
beforeEach(async () => {
  await Blog.deleteMany({});

  // Initialize the new blog objects in an array
  const blogsObject = initialBlogs.map(blog => new Blog(blog));
  // Save the blog objects to the DB, this will create an array of promises
  const promiseArray = blogsObject.map(blog => blog.save());

  // Wait with the execution until all the promises ae resolved
  await Promise.all(promiseArray);
});

describe('When there is initially some blogs saved', () => {
  test('Blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('The returned blogs _id key is formatted correctly (id)', async () => {
    const res = await api.get('/api/blogs');

    // const blogsArr = res.body.map(blog => blog);

    res.body.forEach(blog => {
      expect(blog.id).toBeDefined();
    });
  });

  test('All blogs are returned', async () => {
    const res = await api.get('/api/blogs');

    expect(res.body).toHaveLength(initialBlogs.length);
  });
});

describe('Addition of a new blog', () => {
  test('After posting a new blog the blogs array in the DB increases by one and the the new content is correct', async () => {
    const newBlog = {
      title: 'Jest Backend Testing',
      author: 'Zoltan Szokodi',
      url: 'https://myblog.com/test',
      likes: 42,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const res = await api.get('/api/blogs');

    expect(res.body).toHaveLength(initialBlogs.length + 1);

    // const blogsArr = res.body.map(blog => blog);
    console.log(res.body);

    expect(res.body[res.body.length - 1]).toMatchObject(newBlog);
  });

  test('If the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
      title: 'Jest Backend Testing 2',
      author: 'Zoltan Szokodi',
      url: 'https://myblog.com/test2',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const res = await api.get('/api/blogs');

    expect(res.body[res.body.length - 1].likes).toBe(0);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
