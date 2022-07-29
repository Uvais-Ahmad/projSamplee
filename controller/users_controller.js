module.exports.profile = function(req , res){
    console.log('We are here fireing up the Profile Conenc');
    return res.render('userProfile');
}

module.exports.posts = function(req ,  res ){

    console.log('=======================POst firing up ');
    return res.render("userposts");
}  