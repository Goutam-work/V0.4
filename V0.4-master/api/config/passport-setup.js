
var passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20'); 

const keys = require('./keys');
//const User = require('../../api/model/authModel');
//const User = require("../model/authModel");
//const User = require("../controllers/authController");


passport.serializeUser(function(profile, done) {
    done(null, profile);
});

passport.deserializeUser(function(profile, done) {
    done(null, profile);
});


passport.use(
    new GoogleStrategy({
        callbackURL:'/auth/google/redirect',
        clientID:keys.google.clientID,
        clientSecret:keys.google.clientSecret
},(req,acessToken,refreshToken,profile,done)=>{
    //req.profile = profile;
    done(null,profile)
    // var newUser = {};
    // newUser.email = profile.emails[0].value;
    // User.signup(newUser,function(error,results){
    //     if(error) {
    //       console.log(error); 
    //     } else {
    //       console.log("sucess");
    //     }
    //   });
    // done();
})
) 
