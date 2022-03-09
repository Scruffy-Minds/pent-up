const port = '3786';
let siteName = 'Pent Up!'

require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
// const nodemailer = require('nodemailer');
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname + '/public')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    let title = `Pent Up!`;
    res.render('qr', {
        title: title
    });
});

app.get('/qr', (req, res) => {
    let title = `Pent Up Links`;
    res.render('qr', {
        title: title
    });
});

app.get('/press', (req, res) => {
    let title = `Pent Up! | Press Pack`;
    res.render('press', {
        title: title
    });
});


// app.get('/taxes', (req, res) => {
//     // This code is copy/paste to calculate Sales Tax by address.
//     // From https://rapidapi.com/TaxProDigital/api/sales-tax-calculator
//     fetch("https://sales-tax-calculator.p.rapidapi.com/rates", {
//             "method": "POST",
//             "headers": {
//                 "content-type": "application/json",
//                 "x-rapidapi-host": "sales-tax-calculator.p.rapidapi.com",
//                 "x-rapidapi-key": "e822d0871bmsh97ca544747a5f59p18d7b6jsnbf0bd5c5987c"
//             },
//             "body": {
//                 "city": "Marysville",
//                 "state": "WA",
//                 "street": "8726 45th Dr NE",
//                 "zip": "98270"
//             }
//         })
//         .then(response => {
//             console.log(response);
//         })
//         .catch(err => {
//             console.error(err);
//         });
// });

app.listen(process.env.PORT || port, function () {
    let startTime = new Date();
    let options = {
        hour: 'numeric',
        minute: 'numeric'
    };
    console.log(`Pent Up! Website up and running, port ${port} on ${startTime.toLocaleDateString("en-US", options)}.`);
});


// color scheme
// https://colorhunt.co/palette/822a7c7174753f4142e8e8e8