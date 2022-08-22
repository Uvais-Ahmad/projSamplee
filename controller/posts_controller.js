const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create =async function( req , res ){

    try{
        //this is used to create the data of post 
        await Post.create({
        //set Value of content and user on which id we post
            content : req.body.content,
            user:req.user._id       //here auto callled setAuth function 
        })
        req.flash('success','Post Published !');
        return res.redirect('back');
    }
    catch(err){
        req.flash('error',err); return;
    }
    
};


//to delete the post 
module.exports.destroy = async function(req , res){
    //first check is there any post
    try{
        let post = await Post.findById( req.params.id )

            //.id means to conver _id into string
        if( post.user == req.user.id ){
            post.remove();
            await Comment.deleteMany({ post : req.params.id})
            req.flash('success','Post Deleted with All comment!');
            return res.redirect('back');
        }
        else{
            req.flash('error','User UnAuthorized You cant Delete');
            return res.redirect('back');
        }
    }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}
