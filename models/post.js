const mongoose = require('mongoose');

//Create Schema of  posts
const postSchema = new mongoose.Schema({
    content:{
        type : String,
        required : true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    }
},{
    timestamps:true
});

const Post = mongoose.Model('Post',postSchema);

module.exports = Post;