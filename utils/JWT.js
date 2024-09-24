const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const SECRET_KEY = process.env.SECRET_KEY; 

const generateToken = (applicant) => {
  if (!applicant || !applicant.email || !applicant.phone) {
    throw new Error('Invalid user data');
  }

  return jwt.sign(
    {
      email: applicant.email,
      phone: applicant.phone,
    },
    SECRET_KEY,
    { expiresIn: '24h' }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };