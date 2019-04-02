const errors = require('../../util/errors');

module.exports = function roles(...allowed) {
    const isAllowed = role => allowed.indexOf(role) > -1;
    
    // return a middleware
    return (req, res, next) => {
      if (!req.user || !isAllowed(req.user.role))
      res.locals.error = errors.UNAUTHORIZED;  
      next();
    }
    
  }