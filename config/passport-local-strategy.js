//first add Module of passport
const passport = require('passport');
console.log("PassportJs start");
//Adding which strategy u want to include in this file so here we use PASSPORT-LOCAL strategy
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users');

// passport.use( new LocalStrategy( {username } , callback ) )
passport.use( new LocalStrategy({
        //here we define only what is username frild
        usernameField :'email',
        passReqToCallback : true
    },
    function( req , email , password , done ){                            //done is a function which accept two argu 
        //Find a user and Establish the identit                     //first is Error Obj , Second Auth or NotAuth its a calllbackfunc
        User.findOne( { email : email} , function (err , user){
            if(err){
                // console.log('Error in finding user --> Passport');
                req.flash('error',err);
                return done(err);
            }
            //User not found  /password not match
            if( !user || user.password != password ){
                // console.log('Invalid username or password');
                req.flash('error','Invalid username or password');
                return done(null , false);
            }
            return done(null , user);
        });
    }
));

//serializing the user to decide which key is to be kept in the cookie i.e. it add UserId cookie in user browser in Encrypted form
passport.serializeUser( function( user , done){
    return done(null ,user);
})

//deserializing  the user when the user make the request to the server it deserialize first
passport.deserializeUser( function( id , done){
    //first check user Exist with this id
    User.findById(id , function( err , user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        return done(null , user);
    });
});

//check if the user is authenticateds
passport.checkAuthentication = function( req , res , next ){
    console.log("CHECK AUTH CALLED");
    //if the user is signIn , then pass on the request to the next function(controller function)
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}

    //set the Authencticator usesr values
passport.setAuthenticatedUser = function( req , res , next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookies
        //and we are just sending locals for views
        console.log("set Authentication called");
        res.locals.user = req.user;
    }
    //after setting next() here req pass to the nextTransfer
    next();
}

module.exports = passport;  