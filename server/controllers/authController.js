const User = require('../models/User');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

const generateToken = (id) => {
  return jwt.sign({ id }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  };

  try {
    const user = await User.create({ name, email, password });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user.id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }
  const user = await User.findOne({ where: { email } });

  if (user && (await user.comparePassword(password))) {
    res.json({
      message: 'Logged in successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user.id),
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};


const getMe = async (req, res) => {
  res.json({
    message: 'User data fetched',
    user: req.user,
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};