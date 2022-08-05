const express = require('express');
const port = 8000;
const app = express();
const db = require('./config/mongoose');
//This is Schema for storing Email And Password
const User = require('./models/users');

//First install Thsi module and add it layout
const ExpressLayout = require('express-ejs-layouts');

//This module use to add cookies in our website
const cookieParser = require('cookie-parser');

//Now use it
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views','./views');  

//the subpages css is load at top of page now its append on right place
// app.set('layout extractStyles',true);
// app.set('layout extractScripts',true);

//Here we are using that module only Now create "Layout.ejs" file and make a layout
//This  "layout.ejs" file not to be render. All Files set in Layout file then render auto by the express 
app.use(express.urlencoded());
app.use(express.static('assets'));
//This middleware used to launch the Layout System
// app.use(ExpressLayout);
app.use('/',require('./routers'));




app.listen(port , function(err){
    if(err){console.log(`Error occur while runnig server ${err}`);  return;}
    console.log('Server is runnig successfully...Of sample Proj');

}); 