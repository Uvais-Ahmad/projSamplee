const User = require('../models/users');


module.exports.profile = function(req , res){
    console.log('We are here fireing up the Profile Conenc');
    return res.render('userProfile');
}

module.exports.posts = function(req ,  res ){

    console.log('=======================POst firing up ');
    return res.render("userposts");
}  

module.exports.signIn = function(req , res ){
    res.render('user_sign_in',{
        title:'SignIn'
    });
}

module.exports.signUp = function(req , res ){
    res.render('user_sign_up',{
        title:'SignUp'
    });
}


//GET THE signUp data
module.exports.create = function(req , res ){
    //if password and confirm pass is not matched
    if(req.body.password != req.body.confirm_password){
        res.redirect('back');
    }
    
    //now add models and use it here
    //findOne() use to find one docs
    User.findOne({email : req.body.email} , function(err,user){
        //we check if data not exist then we register that student 
        if(err){ console.log('Error ,in finding One docs ');}

        if(!user){
            User.create(req.body ,function(err , user){
                if(err){ console.log('Error , Storing data in mongoDB ');}

                res.redirect('/users/sign-in');
            });
        }
        else{
            res.redirect('/users/sign-in');
        }
    })
}

//get the SignIn data AND CREATE A session for a user
module.exports.createSession = function(req , res){
    console.log('Yes Comes in handler create Session');
    return res.redirect('/');
}