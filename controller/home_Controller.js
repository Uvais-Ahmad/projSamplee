const Post = require('../models/post');
const User = require('../models/users');

//used to show post on homme with post creater name
module.exports.home = async function(req , res ){
    //to find all details about refrenced user  Use POPULATE() func
    // Post.find({}).populate..popu..exec(callback and find user inside it and then render it )
    try{
        let posts = await Post.find({})
        .sort('-createdAt')     //This is used to sort data via timing
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

//Without async await it is much nested code

// module.exports.home = function(req , res ){
//     Post.find({})
//     .populate('user')
//     .populate({
//         path:'comments',
//         populate:{ path:'user'}
//     })
//     .exec(function(err , posts ){
        
//         if(err){ console.log('Error Occur while find POST ,',err); }
        
//         User.find({} , function( err , users){
//             return res.render('home' , {
//                 title : 'HomePage',
//                 posts:posts ,
//                 all_users : users
//             });
//         })
//     });
// }