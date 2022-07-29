// this work as a root of all routers files
const express = require('express');

const router = express.Router();

const homeController = require('../controller/home_Controller');

console.log('Router has been connected');

//Whenever reques comes from user in '/' then this execute
router.get('/',homeController.home);

//If  '/users' request comes then this will fireUp .
//This index file work as a root of all router files.
// router.use('/users' , require('./users'));

//for any further routes   , access from here
// router.use('/routerName', require('routerFile'));

module.exports = router;
