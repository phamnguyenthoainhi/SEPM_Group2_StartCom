const nodemailer = require('nodemailer');
const functions = require('firebase-functions');

const email = functions.config().gmail.email;
const password = functions.config().gmail.password;

const mailTransport =nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: email,
        pass: password
    }
})

exports.sendEmail = (data)=>{
    const mailOptions={
        from: data.from,
        to: data.to,
        subject: data.subject,
        text: data.text
    }

    return mailTransport.sendMail(mailOptions)
        .then(()=>{ return null})
        .catch(error => {console.log(error)})
}
