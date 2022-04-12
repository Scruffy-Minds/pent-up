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
    let title = `Pent Up! | Post-Pop Indie Emo Punk Rock!`;
    res.render('qr', {
        title: title,
        script: 'qr.js',
        styles: 'qr.css',
        sites: data.sites,
        news: data.news
    });
});

app.get('/press', (req, res) => {
    let title = `Pent Up! | Press Kit`;
    res.render('press', {
        title: title,
        script: 'press.js',
        styles: 'press.css'
    });
});

app.get('/dates', (req, res) => {
    let title = `Pent Up! | Show Dates!`;
    res.render('dates', {
        title: title,
        script: 'dates.js',
        styles: 'dates.css'
    });
});

app.get('/api/dates', async (req, res) => {
    // --------------- Disable the follow code when testing to avoid excessive API calls
    try {
        await fetch(`https://api.songkick.com/api/3.0/artists/10191154/calendar.json?apikey=${process.env.SK_API}`)
            .then(res => res.json())
            .then(data => res.send(data.resultsPage.results));
    } catch (err) {
        console.log('error: ', err);
    }

    // --------------- Activate this code when testing to avoid excessive API calls
    // const filedata = require('./public/javascript/songkick_calendar.json');
    // const results = filedata.resultsPage.results;
    // setTimeout((() => {
    //     res.send(results);
    // }), 1000);
});

app.get('/api/pastdates', async (req, res) => {
    // --------------- Disable the follow code when testing to avoid excessive API calls
    try {
        await fetch(`https://api.songkick.com/api/3.0/artists/10191154/gigography.json?apikey=${process.env.SK_API}`)
            .then(res => res.json())
            .then(data => res.send(data.resultsPage.results));
    } catch (err) {
        console.log('error: ', err);
    }

    // --------------- Enable the follow code when testing to avoid excessive API calls
    // const filedata = require('./public/javascript/songkick_gigiography.json');
    // const results = filedata.resultsPage.results;
    // setTimeout((() => {
    //     res.send(results);
    // }), 1200);
});

app.get('/api/venue-details/:venueId', async (req, res) => {
    try {
        await fetch(`https://api.songkick.com/api/3.0/venues/${req.params.venueId}.json?apikey=${process.env.SK_API}`)
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
