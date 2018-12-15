'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const gmailEmail = 'alexey.komkov.101@gmail.com';
const gmailPassword = 'Alpixx92mad423!';

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

var goMail = function (message) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: gmailEmail,
            pass: gmailPassword
        }
    });

    // setup email data with unicode symbols
    var mailOptions = {
        from: 'alexey.komkov.101@gmail.com', // sender address
        to: 'komkov-1@ya.ru', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: '!' + message, // plain text body
        html: '!' + message // html body
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });

};


exports.onDataAdded = functions.database.ref('/emails/{sessionId}').onCreate(function (snap, context) {
    const createdData = snap.val();
    var text = createdData.mail;
    console.log(text);
    goMail(text);
});
