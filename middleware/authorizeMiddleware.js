// middleware/authorizeMiddleware.js

// Middleware to authorize user roles
function authorize(roles) {
    return (req, res, next) => {
      const userRole = req.user.role;
  
      if (!roles.includes(userRole)) {
        return res.status(403).json({ message: 'Permission denied' });
      }
  
      next();
    };
  }
  
  module.exports = authorize;
  