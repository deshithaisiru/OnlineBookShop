const jwt = require('jsonwebtoken');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
// Protect routes
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Set token from Bearer token
    token = req.headers.authorization.split(' ')[1];
  }
  // Check if token exists in cookies
  else if (req.cookies.token) {
    token = req.cookies.token;
  }
  // Make sure token exists
  if (!token) {
    return next(new AppError('Not authorized to access this route', 401));
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'vijithayapa-secret-key');
    // Get user from token
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new AppError('Not authorized to access this route', 401));
  }
});
// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError(`User role ${req.user.role} is not authorized to access this route`, 403));
    }
    next();
  };
};