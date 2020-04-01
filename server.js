
// you have to create a file mailTransporter.js with this form: 

// var nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: [email],
//     pass: [password]
//   }
// });

// module.exports = transporter;


const transporter = require('./mailTransporter');

const admin = require('firebase-admin');
const serviceAccount = require('./borrowmoney-a0239-firebase-adminsdk-pzyte-1f59f76aba.json') // use your own key here

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
const db = admin.firestore();



var CronJob = require('cron').CronJob;
var express = require('express');
var app = express();



var port = process.env.PORT || 1337;
app.use(express.static(__dirname));

app.get("/", function(req, res) {
  res.render("index")
})


// get data and send email
async function getData() {
  console.log('start')

  await db.collection('users').get()
  .then(snapshot=>snapshot.forEach(

    // check each document
    doc => 
    {
      // if array has elements
      if (doc.data().friendsBorrow.length) {
        doc.data().friendsBorrow.forEach((value, index)=> {
      
          let mailOptions = {
            from: 'demo.tahaphuong@gmail.com', // put your email in your mail transporter here
            to: value.email,
            subject: '[borrowMoneyTHP] You owe ' + doc.data().username + ' money',
            text: doc.data().username + ' with email ' + doc.data().email + ' reminds you to pay back this person ' + value.amount + ' VND. The message is ' + value.title,
          };

          // if the person tick remind
          if (value.remind) {
            // sending email and report errors/infos
            transporter.sendMail(mailOptions, (error, info) => { if (error) {console.log(error)} else {console.log('Email sent: ' + info.response)} } );
          }

        })
      } 
    }

  ))
  .catch(err=>console.log(err))

  console.log('end task')
}



var sendEmailCron = new CronJob('0 0 */2 * * *', function() {
  console.log('demo cronjob');
  getData();
});
sendEmailCron.start();

// listen from port

app.listen(port, function() {
  
  console.log("start listening")
})


