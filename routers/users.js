const express = require('express');
const router = express.Router();
const userController = require('../controller/users_controller');

//this exe related with users routers 
//if req comes in '/users/profile' then this will execute
router.get('/profile',userController.profile);

router.get('/posts',userController.posts);

//This is router to render sign up page
router.get('/sign-up',userController.signUp);

//This is router to render sign in page
router.get('/sign-in',userController.signIn);

//This is used to Register (SignUp)
router.post('/create',userController.create);

//This is used to LogIn and Make session i.e. Render to Profile page
router.post('/create-session',userController.createSession);

//This is Used to sign Out
router.get('/sign-out',userController.signOut);

module.exports = router;