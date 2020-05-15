const loginRouter = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// @desc    Login user
// @route   POST /api/login
// @access  Public
loginRouter.post('/', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  const passwordCorrect =
    user === null
      ? false
      : bcrypt.compare(req.body.password, user.passwordHash);

  if (!(user && passwordCorrect))
    return res.status(401).json({ error: 'Invalid credentials' });

  const { name, username } = user;

  const userCredentials = {
    id: user._id,
    username,
  };

  const token = jwt.sign(userCredentials, process.env.JWT_SECRET);

  res.send({
    token,
    name,
    username,
  });
});

module.exports = loginRouter;
