const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const Like = require('../models/like')

module.exports.create =async function( req , res ){
    //first Find is there Any post on which comment post
    //post is the hidden input Value sent by form
    try{
        let post = await Post.findById(req.body.post );

        console.log("Yes Comment Controller called");
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
            .populate('user',' name email')
            .exec((err , comment )=>{
                console.log("Comment is created : ",comment)
                // commentsMailer.newComment(comment);
                let job = queue.create('emails',comment).save((err)=>{
                    if(err){
                        console.log('There is an error while saving jOb : ',err);
                        return;
                    }
                    console.log("This is Job id : ",job.id);
                })

                console.log('This is comment req.xhr : ',req.xhr);
                
                if(req.xhr){    
                    return res.status(200).json({
                        data : {
                            comment : comment
                        },
                        message : 'Comment Created !'
                    })
                }
            });
            
            // console.log('This is comment req.xhr : ',req.xhr);
            // if(req.xhr){
            //     return res.status(200).json({
            //         data : {
            //             comment : comment
            //         },
            //         message : 'Comment Created !'
            //     })
            // }

            req.flash('success', 'Comment published here!');
        
            res.redirect('/');
        }
    }
    catch(err){
        console.log('Error : ',err);
        return;
    } 
}

// used to delete the particula comment
module.exports.destroy =async function( req , res ){
    //First Check comment is Exist
    let postId;
    try{
        let comment = await Comment.findById( req.params.id ); 
        if( comment.user == req.user.id ){
            //Comment present on this post
            postId = comment.post;
            //Now remove the comment
            comment.remove();        
        }
    let post = await Post.findByIdAndUpdate( postId , { $pull : { comments : req.params.id}} );
    // CHANGE :: destroy the associated likes for this comment
    await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

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
