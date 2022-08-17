const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function( req , res ){
    //first Find is there Any post on which comment post
    //post is the hidden input Value sent by form
    console.log(req.body);
    
    Post.findById(req.body.post , function( err , post ){
        if(err){console.log(`Error Occur while finding post for comment, ${err}`);}

        if(post){
            Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            } , function( err , comment){
                    if(err){ console.log('Error occur while storing comment',err);}

                    post.comments.push(comment);
                    post.save();

                    res.redirect('/');
            });
        }
        
    })
}