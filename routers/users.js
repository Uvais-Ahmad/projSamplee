const express = require('express');
const router = express.Router();
const userController = require('../controller/users_controller');

//this exe related with users routers 
//if req comes in '/users/profile' then this will execute
router.get('/profile',userController.profile);

router.get('/posts',userController.posts);

module.exports = router;