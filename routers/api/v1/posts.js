const express = require('express');
const router = express.Router();

//this is post api controller file
const postApi = require('../../../controller/api/v1/posts_api');

//retrive posts from DB
router.get('/',postApi.index)
// deleing posts from DB
router.delete('/:id', postApi.destroy);

module.exports = router;