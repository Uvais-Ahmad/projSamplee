module.exports.index = function(req , res ){
    return res.json(200 , {
        message : "Second version posts",
        posts : []
    })
}