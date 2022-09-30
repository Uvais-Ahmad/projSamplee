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

        //if  $.ajax({})  req is applied then here "req.xhr" will be true
        if(req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            await Post.findById(post._id).populate('user','name').exec((err,post)=>{
                return res.status(200).json({
                    //data Object send ajax as response and load inside 'success' function
                    data:{
                        post : post
                    },
                    message:"Post Created"
                });

            })
        }
        //its execute bcoz its async so it will be exe 
        //its remove here bcoz we Setup NOTY in assests js
        // req.flash('success','Post Published Now !');
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

            if (req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted success..."
                });
            } 

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
