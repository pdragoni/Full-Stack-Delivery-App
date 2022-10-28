const fs = require('fs');
const md5 = require('md5');
require('dotenv').config();

const jwt = require('jsonwebtoken');

const JWT_SECRET = fs.readFileSync('jwt.evaluation.key', 'utf8');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (data) => {
  const token = jwt.sign(data, JWT_SECRET, jwtConfig);
  return token;
};

const verifyToken = (token) => {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded;
};

const generateHash = (password) => md5(password);

module.exports = { createToken, verifyToken, generateHash };