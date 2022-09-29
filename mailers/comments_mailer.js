//add config file of nodemailer
const nodemailer = require('../config/nodemailer');


// this is another ways for exporting the method
exports.newComment = (comment) => {
  
    //From here we send the html mail
    // let htmlString = nodemailer.renderTemplate({comment : comment} , '/comments/new_comment.ejs');

    //This is avail in docs also
    //Node set values of sendMail function
    console.log(' i am in comment _ mailers ========');
    nodemailer.transporter.sendMail({
        from : 'uvss21@gmail.com',
        to : 'uvru05@gmail.com',
        subject : 'New comment Published',
        // html : htmlString
        html : '<h1>Yup , your comment is now published</h1>'
    } , (err , info) => {
            if(err){
                console.log('Error in sending mail : ',err);
                return;
            }
            console.log('Message Sent : ',info);
            return;
    })
}