const express = require('express');
//This module use to add cookies in our website
const cookieParser = require('cookie-parser');

const port = 8000;
const app = express();

//First install Thsi module and add it layout
const ExpressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');

//for passport Session setup
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

//MongoStore for session storing
const MongoStore = require('connect-mongo');

//Used for accepting data sent by the FORM tags inside req.body
app.use(express.urlencoded({extended:true}));

//Now  use this cookie parser
app.use(cookieParser());

//for accessing the static files such as css/js
app.use(express.static('assets'));

//This middleware used to launch the Layout System
app.use(ExpressLayout);

//the subpages css is load at top of page now its append on right place
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//Here we are using that module only Now create "Layout.ejs" file and make a layout
//This  "layout.ejs" file not to be render. All Files set in Layout file then render auto by the express 

//setup fpr viewing/rendering  the EJS file
app.set('view engine', 'ejs');
app.set('views','./views'); 

//Use For passportJs library
//mongoStore , store th sessions cookie in th 'DB' This Comes from Documentation
app.use(session({
    name:"projSamplee",
    secret:'ThisIsUvaisAhmad',
    saveUninitialized : false,
    resave :false,
    cookie:{
        maxAge:(1000*60*100)
    },
    //New syntax learn from the documentation "connect-mongo"
    store: MongoStore.create(
        {
            mongoUrl:'mongodb://localhost/projSample_developer',
            autoRemove :'disabled'
        },
        function(err){
            console.log( err || 'MongoStore Setup is Ok .')
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
//set The authenticated user in the locals
app.use(passport.setAuthenticatedUser);

//This must be use at the end of the functions
app.use('/',require('./routers'));

app.listen(port , function(err){
    if(err){console.log(`Error occur while runnig server ${err}`);  return;}
    console.log('Server is runnig successfully...Of sample Proj');

}); 