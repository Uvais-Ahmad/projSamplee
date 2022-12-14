const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar : {        // Used for AVATAR
        type :String
    }
},{
  timestamps : true
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname ,'..',AVATAR_PATH))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + Date.now());
    }
  });


  //Make static methods
  userSchema.statics.uploadedAvatar =  multer({ storage:storage }).single('avatar');
  //WE WRITE HERE becoz we can use it publicly
  userSchema.statics.avatarPath = AVATAR_PATH;



const User = mongoose.model('User',userSchema);

module.exports = User;
