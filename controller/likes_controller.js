const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function( req , res ){

    try{

        let likeable;
        let deleted = false; //deleted true its means you liked already.

        if(req.query.type === 'Post'){

            likeable = await Post.findById(req.query.id).populate('Likes');

        }else{

            likeable = await Comment.findById(req.query.id).populate('Likes');
        }


        //Checks if a Likes is already Exist
        let existingLike = await Like.findOne({
            likeable : req.query.id,
            onModel : req.query.type,
            user : req.user._id
        })


        //if a like already Exist then delete it
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted = true;
        }else{
            //take a new Like
            let newLike = await Like.create({
                user : req.user._id,
                likeable : req.query.id,
                onModel : req.query.type,
            });

            likeable.likes.push(like._id);
            likeable.save();
        }

        return  res.status(200).json({
            message : " Requet Successful",
            data : {
                deleted : deleted

            }
        })    

    }catch(err){
        return res.status(500).json( {
            message : "Internal Server Error",
            error:err
        })
    }
}