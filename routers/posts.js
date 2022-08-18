const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController = require('../controller/posts_controller')

//Only auth User can goto this routes
router.post('/create' , passport.checkAuthentication ,postController.create);

//used to destroy the post and here we pass the postId using String Params
router.get('/destroy/:id',passport.checkAuthentication , postController.destroy);

module.exports= router;