module.exports.home = function(req , res ){
    //using end() we direct work but we render an ejs file here
    // res.end('<h1>Controller set and Express start for controller</h1>');
    
    
    //its already stored cookies while requesting the server
    console.log(req.cookies);
    return res.render('home' , {title : 'homePage'});
}