//add config file of nodemailer
const nodemailer = require('../config/nodemailer');

// this is another ways for exporting the method
exports.newComment = (comment) => {
    console.log('Inside newComment Mailer:::::::' , comment);

    //This is avail in docs also
    //Node set values of sendMail function
    nodemailer.transporter.sendMail({
        from : 'uvss21@gmail.com',
        to : comment.user.email,
        subject : 'New comment Published',
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