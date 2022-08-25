const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create =async function( req , res ){

    try{
        //this is used to create the data of post 
        let post = await Post.create({
        //set Value of content and user on which id we post
            content : req.body.content,
            user:req.user._id       //here auto callled setAuth function 
        })

        //First Check is AJAX requested or Not xhr == XmlHttpRequest
        if(req.xhr)
        {   console.log('Yes response from POST controller ');
            return res.status(200).json({
                data:{
                    post : post
                },
                message:"Post Created"
            })
        }
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
