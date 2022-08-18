const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function( req , res ){
    //this is used to create the data of post 
    Post.create({
        //set Value of content and user on which id we post
        content : req.body.content,
        user:req.user._id       //here auto callled setAuth function 
    } , function( err , post ){
        if(err){ console.log('Error in creating a posts'); }

        return res.redirect('back');
    });
}

//to delete the post 
module.exports.destroy = function(req , res){
    //first check is there any post
    Post.findById( req.params.id , function( err , post ){

        if(err){
            console.log('Error Occur while finding the post to delete ',err);
        }
        //.id means to conver _id into string
        if( post.user == req.user.id ){
            post.remove();

            Comment.deleteMany({ post : req.params.id},function(err){
                if(err){console.log('Occur while deleteing comments of post deleting')}
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    });
}