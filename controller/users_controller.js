module.exports.profile = function(req , res){
    console.log('We are here fireing up the Profile Conenc');
    return res.render('userProfile');
}

module.exports.posts = function(req ,  res ){

    console.log('=======================POst firing up ');
    return res.render("userposts");
}  

module.exports.signIn = function(req , res ){
    res.render('user_sign_in',{
        title:'SignIn'
    });
}

module.exports.signUp = function(req , res ){
    res.render('user_sign_up',{
        title:'SignUp'
    });
}

module.exports.create = function(req , res ){
    console.log(req.body);
}