const User = require('../models/User');
const jwt = require('jsonwebtoken');

const register = async (userData) => {
  const user = new User(userData);
  await user.save();
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'supersecretjwtkey_for_development', { expiresIn: '7d' });
  return { token, expiresIn: 604800, user };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || user.password !== password) throw new Error('Geçersiz kimlik bilgileri');
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'supersecretjwtkey_for_development', { expiresIn: '7d' });
  return { token, expiresIn: 604800, user };
};

module.exports = { register, login };
