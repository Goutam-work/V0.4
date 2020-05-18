var con = require('../connection');
var User = function(user){
    this.name = user.name || "";
    this.email = user.email;
    this.phoneNumber = user.phoneNumber || null;
    this.sex = user.sex || "";
    this.password = user.password || "";
    this.emergencyContact = user.emergencyContact || null;
};

User.login = function login(email,result){
    con.query("SELECT user_id,user_name,user_mail,user_password from user where user_mail= ?",email,function(err,res){
      if(err){
        result(err,null);
      }else{
        result(null,res);
      }
    });
};

User.chekUser = function chekUser(email,result){
  con.query("SELECT * FROM user  WHERE user_mail = ?",email,function(err,res){
    res.status = false;
    if(err){
      result(err,null);
    }else{
      res.status = true;
      result(null,res);
    }
  });
}

User.signup = function signup(newUser,result){
    con.query("INSERT INTO user(user_name,user_mail,user_password,type_id) values(?,?,?,?)",[newUser.name,newUser.email,newUser.password,2],function(err,res){
      if(err){
        result(err,null);
      }else{
        result(null,res);
      }
    });
};

User.signupOtherAccount = function signup(newUser,result){
  con.query("INSERT INTO user(user_mail,user_name,type_id) values(?,?,?)",[newUser.email,newUser.name,2],function(err,res){
    if(err){
      result(err,null);
    }else{
      con.query("SELECT user_id,user_name,user_mail,user_password from user where user_mail= ?",newUser.email,function(err,res){
        if(err){
          result(err,null);
        }else{
          result(null,res);
        }
      });
    }
  });
};

User.email = function email(email,result){
  con.query("SELECT * FROM user  WHERE user_mail = ?",email,function(err,res){
    if(err){
      result(err,null);
    }else{
      result(null,res);
    }
  });
}

User.phoneNumber = function email(phoneNumber,result){
  con.query("SELECT 1 FROM tabl_users  WHERE phoneNumber = ?",phoneNumber,function(err,res){
    if(err){
      result(err,null);
    }else{
      console.log(res);
      result(null,res);
    }
  });
}

User.googleSignUp = (email,name,googleId) => {
  con.query("INSERT INTO user(user_name,user_mail) values(?,?)",[name,email],function(err,res){
    if(err){
      result(err,null);
    }else{
      result(null,res);
    }
  });
}

module.exports = User;
