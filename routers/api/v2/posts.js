const express = require('express');
const router = express.Router();

//this is post api controller file
const postApi = require('../../../controller/api/v2/posts_api');

router.get('/',postApi.index);

module.exports = router;