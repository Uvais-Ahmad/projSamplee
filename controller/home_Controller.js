module.exports.home = function(req , res ){
    //using end() we direct work but we render an ejs file here
    // res.end('<h1>Controller set and Express start for controller</h1>');

    return res.render('home' , {title : 'homePage'});
}