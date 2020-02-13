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


let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  res.status(401);
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string    
    token = token.slice(7, token.length);
  }  

  if (token) {
    jwt.verify(token, process.env.API_KEY, (err, decoded) => {
      if (err) {        
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        res.status(200);
        req.decoded = decoded;
        next();
      }
    });
  } else {    
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  notFound,
  errorHandler,
  generateToken,
  checkToken,
};
