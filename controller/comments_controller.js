const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');

module.exports.create =async function( req , res ){
    //first Find is there Any post on which comment post
    //post is the hidden input Value sent by form
    try{
        let post =await Post.findById(req.body.post );
        let comment;
        if(post){
                comment =await Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            });
            post.comments.push(comment);
            post.save();
            //populate the user and send user which is current post
            await Comment.findOne({content : req.body.content })
            .populate('user','email')
            .exec((err , comnt )=>{
                commentsMailer.newComment(comnt);
            });
            
            if(req.xhr){
                console.log('Yes Called Comment CONTROLLER');
                comment = await comment.populate('user','name').execPopulate();
                return res.status(200).json({
                    data : {
                        comment : comment
                    },
                    message : 'Comment Created !'
                })
            }

            req.flash('success', 'Comment published!');
        
            res.redirect('/');
        }
    }
    catch(err){
        console.log('Error : ',err);
    } 
}

// used to delete the particula comment
module.exports.destroy =async function( req , res ){
    //First Check comment is Exist
    try{
        let comment = await Comment.findById( req.params.id ); 
        if( comment.user == req.user.id ){
            //Comment present on this post
            let postId = comment.post;
            //Now remove the comment
            comment.remove();        
        }
    let post = await Post.findByIdAndUpdate( postId , { $pull : { comments : req.params.id}} );

    // send the comment id which was deleted back to the views
    if (req.xhr){
        return res.status(200).json({
            data: {
                comment_id: req.params.id
            },
            message: "Post deleted"
        });
    }

    req.flash('success', 'Comment deleted!');

    return res.redirect('back');
    }
    catch(err){
        console.log(err);
    }
}

// module.exports.create = function( req , res ){
//     //first Find is there Any post on which comment post
//     //post is the hidden input Value sent by form
//     console.log(req.body);
    
//     Post.findById(req.body.post , function( err , post ){
//         if(err){console.log(`Error Occur while finding post for comment, ${err}`);}

//         if(post){
//             Comment.create({
//                 content : req.body.content,
//                 post : req.body.post,
//                 user : req.user._id
//             } , function( err , comment){
//                     if(err){ console.log('Error occur while storing comment',err);}

//                     post.comments.push(comment);
//                     post.save();

//                     res.redirect('/');
//             });
//         }  
//     })
// }

//Used to delete the comment MUCH NESTING CODE
// module.exports.destroy = function( req , res ){
//     //First Check comment is Exist
//     Comment.findById( req.params.id , function(err , comment ){
//         if(err){ console.log('There is an Error While finding the comment to delete')}
//         if( comment.user == req.user.id ){
//             //Comment present on this post
//             let postId = comment.post;
//             //Now remove the comment
//             comment.remove();
//             //On that post id Find Comment id inside array of comment and Update it
//             Post.findByIdAndUpdate( postId , { $pull : { comments : req.params.id}} , function (err , post){
//                 return res.redirect('back');
//             })
//         }
//         else{
//             return res.redirect('back');
//         }
//     });
// }
