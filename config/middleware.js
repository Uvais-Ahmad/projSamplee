//Each m/w have three arguments
module.exports.setFlash = function( req , res , next ){
    //we set Flash messages in the lcoals variable
    res.locals.flash = {
        'success' : req.flash('success'),
        'error' : req.flash('error')
    }
    //this is more require bcoz control goes from here to next exe state... 
    next();
}