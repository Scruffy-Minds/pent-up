const port = '3786';
const siteName = 'Pent Up!';

require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const { query } = require('express');
// const nodemailer = require('nodemailer');
const app = express();
const fetch = require('node-fetch');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname + '/public')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect('/qr');
});

app.get('/qr', (req, res) => {
    const data = require('./public/javascript/qr_data.json');  
    let title = `Pent Up! Post-Pop Indie Emo Punk Rock!`;
    res.render('qr', {
        title: title,
        script: 'qr.js',
        styles: 'qr.css',
        sites: data.sites,
        news: data.news
    });
});

app.get('/press', (req, res) => {
    let title = `Pent Up! | Press Pack`;
    res.render('press', {
        title: title
    });
});

app.get('/dates', (req, res) => {
    let title = `Pent Up! Upcoming show!`;
    res.render('dates', {
        title: title,
        script: 'dates.js',
        styles: 'dates.css'
    });
});

app.get('/api/dates', async (req, res) => {
    try {
        await fetch(`https://api.songkick.com/api/3.0/artists/10191154/calendar.json?apikey=${process.env.SK_API}`)
            .then(res => res.json())
            .then(data => res.send(data.resultsPage.results));
    } catch (err) {
        console.log('error: ', err);
    }
});

app.get('/api/pastdates', async (req, res) => {
    try {
        await fetch(`https://api.songkick.com/api/3.0/artists/10191154/gigography.json?apikey=${process.env.SK_API}`)
            .then(res => res.json())
            .then(data => res.send(data.resultsPage.results));
    } catch (err) {
        console.log('error: ', err);
    }
});

app.listen(process.env.PORT || port, function () {
    let startTime = new Date();
    let options = {
        hour: 'numeric',
        minute: 'numeric'
    };
    console.log(`Pent Up! Website up and running, port ${port} on ${startTime.toLocaleDateString("en-US", options)}.`);
});
