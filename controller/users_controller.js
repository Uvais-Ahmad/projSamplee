module.exports.profile = function(req , res){
    console.log('We are here fireing up the Profile Conenc');
    res.end('<h1>User profile here </h1>');
}

module.exports.posts = function(req ,  res ){

    console.log('=======================POst firing up ');
    res.end('<h1>User Post here and we will be working here</h1>');
}  