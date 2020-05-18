const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
  try{
    const token = req.cookies.token;
    const decoded = jwt.verify(token,process.env.JWT_PRIVATE_KEY);
    req.isLoggedIn = true;
    req.userData = decoded;
  }catch(error){
    req.isLoggedIn = false
  }
  next();
}
