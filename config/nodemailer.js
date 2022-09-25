const ejs = require('ejs');
const path = require('path');
// add module
const nodemailer = require('nodemailer');

//Connect transporter with nodemailer Obj and Here set Some values
//this is part how msg communicates

let transporter = nodemailer.createTransport({
    
    host : 'smtp.ethereal.email',
    port : 587,
    secure : true,
    auth : {
        user : 'golda.hartmann@ethereal.email',
        pass : 'RedwBxJnu8559x2ceF'
    }

});

let renderTemplate = (data , relativePath ) => {
    let mailHTML;
    // ejs.renderFile( path , data , callback)

    ejs.renderFile (
        path.join(__dirname , '../views/mailers' , relativePath),
        data,
        function(err , template){
            if(err){console.log('Error in rendering template ',err); return}
            mailHTML = template;
        }
    )

    return mailHTML;
}

module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}