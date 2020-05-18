var userService ={
  checkName : function(name){
    if(name.trim().length===0){
      return "This field is required"
    } else if(!/^[A-Za-z ]+$/.test(name.trim())){
      return "Name should contain only alphabets";
    }
    return "";
  },
  checkEmail : function(email){
    let emailRegEX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if(email.trim().length===0){
      return "This field is required"
    } else if(!emailRegEX.test(email.trim())){
      return "please enter a valid email address eg:- a@gmail.com";
    }
    return "";
  },
  checkPhoneNumber : function(phoneNumber){
    if(phoneNumber.length===0){
      return "This field is required"
    }
    if (!/[1-9][0-9]{9}/.test(phoneNumber)){
      return  "phone number must contain 10 digits";
    }
    return "";
  },
  checkPassword: function (password){
     let passwordRegEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}/;
     if(password.trim().length===0){
       return "This field is required"
     }
     if ( !passwordRegEX.test(password.trim())){
       return "Password must contain at least 5 characters, including UPPER,lowercase and number";
     }
    return "";
  },
  checkUser : function(name,email,phoneNumber,sex,password,emergency,result){
    let user = {
      nameMessage : this.checkName(name), 
      emailMessage : this.checkEmail(email),
      phoneNumberMessage : this.checkPhoneNumber(phoneNumber),
      sexMessage : this.checkName(sex),
      passwordMessage : this.checkPassword(password),
      emergencyMessage : this.checkPhoneNumber(emergency)
    };

    if(!user.nameMessage.length && !user.emailMessage.length && !user.phoneNumberMessage.length && !user.sexMessage.length && !user.passwordMessage.length && !user.emergencyMessage.length){
      result(true,user);
    } else {
      result(false,user);
    }
  },
  signupValidate : function(name,email,password,result){
    let user = {
      nameMessage : this.checkName(name),
      emailMessage : this.checkEmail(email),
      passwordMessage : this.checkPassword(password)
    };

    if(!user.nameMessage.length && !user.emailMessage.length && !user.passwordMessage.length){
      result(true,user);
    } else {
      result(false,user);
    }
  },
  signupWithOtherAccount : function(other_party,result){
    let emailMessage = "";
    let user = {
      email : "",
      name : ""
    };
    if(other_party == "google"){
      
      user.email="";
      user.name="";
    }
    else if(other_party == "facebook"){

      user.email="";
      user.name="";
    }
    if(!emailMessage.length){
      result(true,user,emailMessage);
    } else {
      result(false,user,emailMessage);
    }
  }
};

module.exports = userService;
