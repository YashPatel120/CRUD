// controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model

const SECRET_KEY = 'your-secret-key'; // Replace with a secure secret key

// User registration
async function register(req, res) {
  try {
    const { username, password } = req.body;
    // Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
}

// User login
async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Authentication failed' });
  }
}

module.exports = {
  register,
  login,
};
