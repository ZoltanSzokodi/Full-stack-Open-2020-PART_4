const usersRouter = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('express-async-errors');

// @desc    Create a new user
// @route   POST /api/users
// @access  Public
usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body;
  // const saltRounds = 10;
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    username,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

// @desc    Get all users
// @route   GET /api/users
// @access  Public
usersRouter.get('/', async (req, res) => {
  const users = await User.find({});

  res.send(users);
});

module.exports = usersRouter;
