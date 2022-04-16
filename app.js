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
const redirectSSL = require('redirect-ssl')
const linkData = require('./public/javascript/qr_data.json');

// app.use(redirectSSL.create({
//     exclude: ['localhost:3786']
// }));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname + '/public')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect('/qr');
});

app.get('/qr', (req, res) => {
    const title = `Pent Up! | Post-Pop Indie Emo Punk Rock!`;
    res.render('qr', {
        title: title,
        script: 'qr.js',
        styles: 'qr.css',
        sites: linkData.sites,
        news: linkData.news
    });
});

app.get('/press', (req, res) => {
    const title = `Pent Up! | Press Kit`;
    res.render('press', {
        title: title,
        script: 'press.js',
        styles: 'press.css',
        sites: linkData.sites
    });
});

app.get('/dates', (req, res) => {
    const title = `Pent Up! | Show Dates!`;
    res.render('dates', {
        title: title,
        script: 'dates.js',
        styles: 'dates.css',
        sites: linkData.sites
    });
});

app.get('/api/dates', async (req, res) => {
    const apiCall = (type) => `https://api.songkick.com/api/3.0/artists/10191154/${type}.json?apikey=${process.env.SK_API}`;
    try {
    Promise.allSettled([fetch(apiCall('calendar')).then(data => data.json()), fetch(apiCall('gigography')).then(data => data.json())])
        .then(data => res.send(data[0].value.resultsPage.results.event.concat(data[1].value.resultsPage.results.event)));
    } catch (err) {
        console.log('error: ', err);
    }

    // --------------- Activate this code and comment out original when testing to avoid excessive API calls
    // const current = require('./public/javascript/songkick_calendar.json');
    // const past = require('./public/javascript/songkick_gigiography.json');
    // setTimeout((() => res.send(current.resultsPage.results.event.concat(past.resultsPage.results.event))), 300);
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

app.post('/subscribe', (req, res) => {
    console.log('it got clicked');
    
})

app.listen(process.env.PORT || port, function () {
    const startTime = new Date();
    const options = {
        hour: 'numeric',
        minute: 'numeric'
    };
    console.log(`Pent Up! Website up and running, port ${port} on ${startTime.toLocaleDateString("en-US", options)}.`);
});
