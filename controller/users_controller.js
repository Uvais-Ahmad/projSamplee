const User = require('../models/users');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req , res){
    //Now profile page shownig only using Id of user
    User.findById( req.params.id , function ( err , user){
        return res.render('userProfile',{
            title:'User Profile',
            profile_user : user
        });
    })
    
}

//This is used to update User information
module.exports.update =  async function( req , res ){
    //first Check is Auth
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate( req.params.id , req.body , function( err , user){ //{ name:req.body.name, email:req.body.email}
    //         if( err ){ console.log('Error Occur while updating the user details'); }

    //         req.flash('success','Updated !');
    //         return res.redirect('back');
    //     })
    // }else{
    //     return res.status(401).send('Unauhorizes');    //200 for success 400 not  find
    // }

    if(req.user.id == req.params.id){

        try{

            let user = await User.findById(req.params.id);
            //this is used to set information of form 
            User.uploadedAvatar( req , res , function(err){
                if(err){console.log('==========Multer_Error : ',err);}
                
                //Here We update the info of user 
                user.name = req.body.name;
                user.email = req.body.email; 

                if(req.file){

                    //first Check is any avatar aval for this user
                    //before delee check first
                    // if(user.avatar){
                    //     // fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    // }
                    
                    //this is saving the path of the uploadedfile into the avatar field in the user
                    //his is path of file
                    user.avatar = User.avatarPath + '/' + req.file.filename;  
                }
                //Now save all details of current details
                user.save();
                req.flash('success','Profile Updated!');
            })
            
            return res.redirect('/');
            
        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }

    }else{
        req.flash('error','UnAuhorised!');
        return res.status(401).send('Unauhorized');
    }

}

module.exports.posts = function(req ,  res ){
    return res.render("userposts");
}  

//if users already signIn we can't open the signIn or signUp page from there 
module.exports.signIn = function(req , res ){
    //if the user is logIn then its shown here
    if(req.user){
        return res.redirect('/users/profile');
    }
    res.render('user_sign_in',{
        title:'SignIn'
    });
}

module.exports.signUp = function(req , res ){
     
    //first check already logIn or not , If logIn then we cant logIn again
    if(req.user){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:'SignUp'
    });
}

//Used to store the SignUp data to the database(MongoDB)
module.exports.create = function(req , res ){
    //if password and confirm pass is not matched
    console.log(req.body);
    if(req.body.password != req.body.confirm_password){
        req.flash('error','confirm password not matched');
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
                req.flash('success','Signed Up');
                // res.redirect('/users/sign-in');
            });
        }
        res.redirect('/users/sign-in');
    });
}

//Get the signIn data and create sessioncooki for the user
module.exports.createSession = function(req , res){
    //we set it in req body
    console.log('Created Session is called ');
    req.flash('success','Logged In successfully');
    return res.redirect('/');
}

//This action used to deestroy the session
module.exports.destroySession = function( req , res ){
    //This function tell the passportJs to delete session
    req.logout(function(err){
        if(err){ console.log(`Error Occur while Logout the session ${err}`); return next(err);}
        req.flash('success','You have logged out!');
        return res.redirect('/');
    });
}

module.exports.forgotPassword = function( req , res ){
    return res.render('forgot_password',{
        title:'Forgot Password'
    });
}