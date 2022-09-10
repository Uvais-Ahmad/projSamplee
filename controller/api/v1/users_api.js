const User = require("../../../models/users")
const jwt = require('jsonwebtoken');

//Get the signIn data and create sessioncooki for the user
module.exports.createSession = async function(req , res){
    console.log('userapi Controller ... ');
    try{
        let user = await User.findOne({email : req.body.email});
        console.log('***********users : ',user);
        if( !user || user.password != req.body.password ){
            //user not found
            return res.status(422).json({
                message : 'Invalid Username or password'
            })
        }
        //user is found
        return res.status(200).json({
            message : "SignIn successfull  , Here is your token please kept it safe",
            data : {
                //here we generate the token using encrpt key "codeial"
                token : jwt.sign(user.toJSON() , 'codeial' , {expiresIn : '10000'} ) 
            }
        })

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }  
}