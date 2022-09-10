const express = require('express');
const router = express.Router();
const passport = require('passport');
//this is post api controller file
const postApi = require('../../../controller/api/v1/posts_api');

//retrive posts from DB
router.get('/',postApi.index)
// deleing posts from DB & and checking Authentication 
router.delete('/:id', passport.authenticate('jwt',{session:false}), postApi.destroy);

module.exports = router;