const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
//const authCheckMiddleware = require('../middleware/authenticate');

router.post('/login',authController.userLogin);

router.post('/signup',authController.userSignup);

router.post('/isLoggedIn',authController.isLoggedIn);

//router.post('/signupWithOtherAccounts',authController.signupWithOtherAccounts);

router.get('/email/:email',authController.checkNewEmail);

//router.get('/phoneNumber/:phoneNumber',authCheckMiddleware.authCheck,authController.checkNewPhoneNumber);
 
router.get('/logout',function(req,res){
    res.clearCookie('token');
    res.status(200).json({message:'logout sucessfully'});
})

module.exports = router;