const User = require('../models/users');


module.exports.profile = function(req , res){
    //FIRST check cookie is prent or not
    if(req.cookies.user_id){
        User.findById( req.cookies.user_id , function(err , user){
            if(err){ console.log('Error occur while finding data in profile page');}
            console.log('==============Data Profile : ',user);
            return res.render('profileNew',{
                title:'Profile',
                obj:user
            });
        });
    //if we put res.redirect out of "else" then "cant set header after sent tot client" Error Occur
    }else{
        return res.redirect('/users/sign-in');
    }


    // console.log('We are here fireing up the Profile Conenc');
    // return res.render('userProfile');
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
            res.redirect('back');
        }
    })
}

//get the SignIn data AND CREATE A session for a user
module.exports.createSession = function(req , res){
    
    //find User
    User.findOne({email : req.body.email },function(err, user){
        if(err){ console.log('Error , While SignIn');}

        //if Found
        if(user){
            //check user password is not matched
            if(user.password != user.password){ 
                return res.redirect('back');
            }

            //User found handle
            //create a cookie and redirect to profile
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
        }
        else{
            console.log('user Not matched');
            return res.redirect('back');
        }
       
    })
}

//This function used to SignOut
//here First we remove Cookies and back to signIn page
module.exports.signOut = function( req , res ){
    //first remove Cookies
    res.clearCookie('user_id');
    res.redirect('/users/sign-in');
}