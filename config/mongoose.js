//This file used to make the connection
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/projSample_developer');

const db = mongoose.connection;

db.on("error",console.error.bind(console,"Error occur while making mongoose connection"));

db.once('open',function(){
    console.log("Connection success to mongoose .");
});

module.exports = db;