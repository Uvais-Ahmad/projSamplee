const mongoose = require('mongoose');

//Create Schema of  posts
const postSchema = new mongoose.Schema({
    content:{
        type : String,
        required : true
    },
    //posts belongs to a user i.e. refre to user Schema
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'      //Give Schema name which saved in Model()
    },
    //include the array of ids of all comments in this post schema itself
    comments : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ]
},{
    timestamps:true
});

const Post = mongoose.model('Post',postSchema);

module.exports = Post;