const Post = require('../models/post');

module.exports.create = function( req , res ){
    //this is used to create the data of post 
    Post.create({
        //set Value of content and user on which id we post
        content : req.body.content,
        user:req.user._id       //here auto callled setAuth function 
    } , function( err , post ){
        if(err){ console.log('Error in creating a posts'); return; }
        return res.redirect('back');
    });
}