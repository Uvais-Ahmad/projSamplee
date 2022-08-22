const Post = require('../models/post');
const User = require('../models/users');
module.exports.home = async function(req , res ){
    //using end() we direct work but we render an ejs file here
    // res.end('<h1>Controller set and Express start for controller</h1>');
    // its already stored cookies while requesting the serve console.log(req.cookies);

    //Find all the post
    // Post.find( {} , function(err , posts){
    //     if(err){ console.log('Error Occur while find POST'); }
    //     return res.render('home' , {
    //         title : 'HomePage',
    //         posts:posts
    //     });
    // });
    //to find all details about refrenced user  Use POPULATE() func

    // Post.find({}).populate..popu..exec(callback and find user inside it and then render it )

    try{
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate:{ path:'user'}
        })
    
        let users = await User.find({});
    
        return res.render('home' , {
            title : 'HomePage',
            posts:posts ,
            all_users : users
        });
    }catch(err){
        console.log('Error : ',err);
        return;
    }
}