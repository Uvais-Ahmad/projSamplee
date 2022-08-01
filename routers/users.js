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

router.post('/create',userController.create);

module.exports = router;