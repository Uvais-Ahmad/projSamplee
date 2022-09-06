const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

//this controller used to retrive all posts from DB
module.exports.index = async function( req , res ){

    //find from DB and render using API
    let posts = await Post.find({})
        .sort('-createdAt')     //This is used to sort data via timing
        .populate('user')
        .populate({
            path:'comments',
            populate:{ path:'user'}
        })



    return res.status(200).json({
        message : "List of posts",
        posts : posts
    });
}

//Used for deleting the posts
module.exports.destroy = async function(req , res){
    //first check is there any post

    try{
        let post = await Post.findById( req.params.id )

            //.id means to conver _id into string
        
        post.remove();
        await Comment.deleteMany({ post : req.params.id})
    
        return res.status(200).json({
            message : "Post and associated comments successfully Deleted",  

        })
        
    }
    catch(err){
        if(err){
            console.log(`******* ${err} `);
        }
        return res.status(500).json({
            message : 'Internal Server Error'
        })
    }
}
