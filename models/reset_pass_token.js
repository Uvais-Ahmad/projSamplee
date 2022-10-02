const mongoose = require('mongoose');

const resetPassTokenSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },

    accessToken : {
        type : String,
        required : true
    },
    
    isValid : {
        type : Boolean,
        required : true
    }
})


const ResetToken = mongoose.model('ResetToken', resetPassTokenSchema);

module.exports = ResetToken;