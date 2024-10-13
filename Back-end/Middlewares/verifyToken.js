require('dotenv');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const bearerToken = req.headers.authorization;

  // If bearerToken not found
  if (!bearerToken) {
    res.send({ message: "Please login" });
  }
  // If bearerToken is found
  else {
    // Get Token from bearerToken
    const token = bearerToken.split(' ')[1];
    console.log(token)
    try
    {
       jwt.verify(token, process.env.SECREAT_KEY); 
      next();
    }
    catch (err) 
    {
      next(err);
    }
  }  
}

module.exports = verifyToken;
