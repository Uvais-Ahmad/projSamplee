const express = require('express');
const router = express.Router();
const userController = require('../controller/users_controller');
//And Passport MOdule
const passport = require('passport');

//this exe related with users routers 
//if req comes in '/users/profile' then this will execute
//to apply condition that profile Show only once then user SigniN THEN "passport.checkAuthen..."

router.get('/profile/:id', passport.checkAuthentication ,userController.profile);

router.post('/update/:id', passport.checkAuthentication ,userController.update);

router.get('/posts',userController.posts);

//This is router to render sign up page Only 
router.get('/sign-up' ,userController.signUp);

//This is router to render sign in page Only
router.get('/sign-in' ,userController.signIn);

//This is used to store the signUp data and signUp the user
router.post('/create',userController.create);
//This is Used to login using PassportJs and Create a session
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect :'/users/sign-in'}
), userController.createSession);

//to clear all the data of the session 
router.get('/sign-out',userController.destroySession);

//Google Strategy
router.get('/auth/google', passport.authenticate('google' , { scope :['profile' , 'email']}));

//callbackURL
router.get('/auth/google/callback' , passport.authenticate('google' ,{failureRedirect : '/users/sign-in'}) , userController.createSession );


router.get('/forgot-password',userController.forgotPassword);

router.post('/reset-password/:accessToken',userController.resetPassword)


module.exports = router;

