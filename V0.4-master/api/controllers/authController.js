const bcrypt = require('bcrypt');
const saltRounds = 10;
const con = require('../connection');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

const User = require("../model/authModel");
const userService = require("../services/authService");

exports.signupWithGoogle = (req,res,next) =>{ 

  // userService.signupWithOtherAccount(party,
  //   function(code,userDetails,userMessage){
  //   if(!code){
  //     res.status(400).json({
  //       status:false,
  //       message:userMessage
  //     });
  //   } else {
  //     var newUser = new User(userDetails);
  //     User.signupOtherAccount(newUser,function(error,result){
  //       if(error) {
  //         res.status(500).json({
  //           status:false,
  //           message:error.message
  //         });
  //       } else {
  //         if(result){
  //           var token = jwt.sign(
  //             {
  //               name:result.user_name,
  //               email:result.user_mail,
  //               id:result.user_id
  //             },
  //             process.env.JWT_PRIVATE_KEY,
  //             {
  //               expiresIn: 300*60*60
  //             }
  //           );
  //           res.cookie('token',token)
  //           res.status(202).json({
  //             status:true,
  //             message:"login successfull",
  //             user:result
  //           });
  //         } else {
  //           res.status(401).json({
  //             status:false,
  //             message:"Authentication Failed"
  //           });
  //         }
  //       }
  //     });
  //   }
  // });
}


exports.userSignup = (req,res,next) =>{
  let user ={
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
  };
  userService.signupValidate(user.name,user.email,user.password,
    function(code,userMessage){
    if(!code){
      res.status(400).json({
        status:false,
        message:userMessage
      });
    } else {
      bcrypt.hash(user.password, saltRounds, function(err, hash) {
        if(err){
          res.status(500).json({
            status:false,
            message:err.message
          });
        } else {

          user.password = hash;
          var newUser = new User(user);
          User.email(newUser.email,function(error,results){
            if(results.length > 0){
              res.status(500).json({
                status:false,
                message:{repeatMessage : "user already exists !!"}
              });
            }
            else{
              User.signup(newUser,function(error,results){
                if(error) {
                  res.status(500).json({
                    status:false,
                    message:error.message
                  });
                } else {
                  res.status(201).json({
                    status:true,
                    message:"Hi "+newUser.name+" Welcome to Playitup!!",
                    user:newUser
                  });
                }
              });
            }
          });
        }
      });
    }
  });
}


exports.userLogin = (req,res,next) => {
  //var login_user = new User(req.body.email);
  User.login(req.body.email,function(error,user){
    if(error){
      res.status(500).json({
        status:false,
        message:error.message
      });
    } else {
      if(!user.length){
        res.status(401).json({
          status:false,
          message:"Invalid email"
        });
      } else {
        bcrypt.compare(req.body.password, user[0].user_password, function(err, result) {
          if(err){
            res.status(500).json({
              status:false,
              message:error.message
            });
          }

          if(result){
            var token = jwt.sign(
              {
                name:user[0].user_name,
                email:user[0].user_mail,
                id:user[0].user_id
              },
              process.env.JWT_PRIVATE_KEY,
              {
                expiresIn: 300*60*60
              }
            );
            res.cookie('token',token)
            res.status(202).json({
              status:true,
              message:"login successfull"
            });
            //return res.json({token:token});
          } else {
            res.status(401).json({
              status:false,
              message:"Authentication Failed"
            });
          }

        });
      }
    }
  });
}
 
exports.loginRequired = function(req,res,next){
  if(req.user){
    next();
  }else{
    return res.status(401).json({message:'Unauthorized user'});
  }
}

exports.checkNewEmail = (req,res,next) => {
  User.email(req.params.email,function(error,result){
    if(error){
      res.status(500).json({message:error.message})
    }else{
      if(result.length){
        res.status(200).json({
          status:200,
          message:"Email already exists"
        });
      } else {
        res.status(201).json({
          status:201,
          message:"Email"
        });
      }
    }
  });
}

exports.checkNewPhoneNumber = (req,res,next) => {
  User.phoneNumber(Number(req.params.phoneNumber),function(error,result){
    if(error){
      res.status(500).json({message:error.message})
    }else{
      if(result.length){
        res.status(200).json({
          status:200,
          message:"This Number is already registered please give another number"
        });
      } else {
        res.status(201).json({
          status:201,
          message:"Phone Number"
        });
      }
    }
  });
}

exports.isLoggedIn = function(req,res,next){
  try{
    const token = req.cookies.token;
    const decoded = jwt.verify(token,process.env.JWT_PRIVATE_KEY);
    res.status(200).json({
      status:true,
      data:decoded,
      message:"User already Logged in"
    });
  }catch(error){
    res.status(401).json({
      status:false,
      message:'Unauthorized user',
      error:error
    });
  }
}