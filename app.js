const port = '3786';
const siteName = 'Pent Up!';

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