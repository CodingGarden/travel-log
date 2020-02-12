const jwt = require('jsonwebtoken');

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  });
};

const generateToken = (req, res, next) => {  
  req.token = jwt.sign({
    id: req.user.id,
  }, process.env.API_KEY);
  next();
}

module.exports = {
  notFound,
  errorHandler,
  generateToken,
};
