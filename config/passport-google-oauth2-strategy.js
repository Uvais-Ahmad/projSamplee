const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');

//Add middleware 
passport.use(new googleStrategy({
        clientID :"158660693437-a9498qqa9ogjna45kko0k7k8iv3go4gp.apps.googleusercontent.com" ,
        clientSecret : "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",
        callbackURL : "http://localhost:8000/users/auth/google/callback"
    },
    //callback function for this middleware
    function( accessToken , refreshToken , profile , done ){
        //First Check user is Already have in my website or new user comes on my sites
        User.findOne({email : profile.emails[0].value})
        .exec(function(err , user){

            if(err){ console.log(`Error in google strategy passport ${err}`)}
            console.log(profile);

            //if user Exists
            if(user){
                return done(null , user);
            }
            //if not exist lets sign Up the user
            else{
                User.create({
                    name : profile.displayName , 
                    email : profile.emails[0].value ,
                    password : crypto.randomBytes(20).toString('hex')
                }, 
                function(err , user){
                    if(err){ console.log(`Error in creating user google strategy passport ${err}`)}

                })
            }
        })
    }

))