const express = require('express');
const router  = require(express.Router());
const commentController = require('../controller/comments_controller');
const Comment = require('../models/comment');
const passport = require('passport');


router.post('/create' , commentController.create);