const { verifyToken } = require('../helpers');

const checkToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

const checkAdmin = (req, res, next) => {
  const { data } = req.user;
  
  if (data.role !== 'administrator') {
    return res.status(401).json({ message: 'Token is not from an administrator' });
  }

  if (data.role === 'administrator') next();
};

module.exports = { checkToken, checkAdmin };