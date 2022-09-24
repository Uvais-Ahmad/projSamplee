const ejs = require('ejs');
const path = require('path');
// add module
const nodemailer = require('nodemailer');

//Connect transporter with nodemailer Obj and Here set Some values
//this is part how msg communicates
let transporter = nodemailer.createTransport({
    service : 'gmail',
    host : 'smtp.gmail.com',
    port : 587,
    secure : false,
    auth : {
        user : 'uvss21@gmail.com',
        pass : 'uvaiszm5'
    }

})

let renderTemplate = (data , relativePath ) => {
    let mailHTML;
    // ejs.renderFile( path , data , callback)

    ejs.renderFile (
        path.join(__dirname , '../views/mailers' , relativePath),
        data,
        function(err , template){
            if(err){console.log('Error in rendering template '); return}
            mailHTML = template;
        }
    )

    return mailHTML;
}

module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}