const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
  try{
    const token = req.cookies.token;
    const decoded = jwt.verify(token,process.env.JWT_PRIVATE_KEY);
    next();
  }catch(error){
    res.redirect('/')
  }
}
