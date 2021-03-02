const jwt = require('jsonwebtoken');

// This function will check if the user has a valid token which will then allow them to move onto the next function
function auth(req, res, next){
   try{
      const token = req.cookies.token;
      if(!token) return res.status(401).json({errorMessage: "Unauthorized"});

      const verified = jwt.verified(token, process.env.JWT_SECRET);
      req.user = verified.user;

      next();
   }catch(err){
      console.error(err);
      res.status(401).json({errorMessage: "Unauthorized"});
   }
}

module.exports = auth;