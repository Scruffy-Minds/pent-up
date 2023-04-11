const port = process.env.PORT || 3786;
const siteName = 'Pent Up!';

require('dotenv').config();
const path = require('path');
const express = require('express');
const request = require('request');
// const bodyParser = require('body-parser');
const ejs = require('ejs');
// const nodemailer = require('nodemailer');
const app = express();
const fetch = require('node-fetch');
// const redirectSSL = require('redirect-ssl');
const linkData = require('./public/javascript/link_data.json');
const res = require('express/lib/response');

// app.use(redirectSSL.create({
//     exclude: ['localhost:3786']
// }));

// Redirect http to https
app.enable('trust proxy');
app.use(function (request, response, next) {
    if (process.env.NODE_ENV != 'development' && !request.secure) {
        return response.redirect("https://" + request.headers.host + request.url);
    }
    next();
});

// app.use(bodyParser.urlencoded({
//     extended: true
// }));
app.use(express.json());
app.use(express.static(path.join(__dirname + '/public')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const title = `Pent Up! | Driving rhythms with punk energy and reckless abandon`;
    // res.render('home', {
    //     title: title,
    //     script: 'home.js',
    //     styles: 'home.css',
    //     linkData: linkData
    // });
    res.render('links', {
        title: title,
        script: 'links.js',
        styles: 'links.css',
        linkData: linkData
    });
});

// app.get('/about', (req, res) => {
//     const title = `Pent Up! | Everything you never wanted to know about Pent Up!`;
//     res.render('about', {
//         title: title,
//         script: 'about.js',
//         styles: 'about.css',
//         linkData: linkData
//     });
// });

app.get('/dates', (req, res) => {
    const title = `Pent Up! | Show Dates!`;
    res.render('dates', {
        title: title,
        script: 'dates.js',
        styles: 'dates.css',
        linkData: linkData
    });
});

app.get('/links', (req, res) => {
    const title = `Pent Up! | Where to find Pent Up! on the web`;
    res.render('links', {
        title: title,
        script: 'links.js',
        styles: 'links.css',
        linkData: linkData
    });
});

app.get('/qr', (req, res) => {
    // url used in QR codes, redirects to the current page we are pushing for landing
    res.redirect('/links');
});

// app.get('/music', (req, res) => {
//     const title = `Pent Up! | All about the music`;
//     res.render('music', {
//         title: title,
//         script: 'music.js',
//         styles: 'music.css',
//         linkData: linkData
//     });
// });

// app.get('/news', (req, res) => {
//     const title = `Pent Up! | What's New?!`;
//     res.render('news', {
//         title: title,
//         script: 'news.js',
//         styles: 'news.css',
//         linkData: linkData
//     });
// });

app.get('/press', (req, res) => {
    const title = `Pent Up! | Press Kit`;
    res.render('press', {
        title: title,
        styles: 'press.css',
        linkData: linkData
    });
});

// app.get(['/qr', '/links'], (req, res) => {
//     const title = `Pent Up! | Pent Up! for City Council!`;
//     res.render('qr', {
//         title: title,
//         script: 'qr.js',
//         styles: 'qr.css',
//         sites: linkData.sites,
//         news: linkData.news
//     });
// });

app.get(['/release', '/newrelease', '/newsingle'], (req, res) => {
    res.redirect(`${linkData.release}`);
});

app.get(['/stream/:platform', '/social/:platform'], (req, res) => {
    const platform = linkData.sites.filter(x => x.id === req.params.platform);
    platform.length === 0 ? res.redirect('/') : res.redirect(platform[0].url);
});

app.get('/tickets', (req, res) => {
    res.redirect(`${linkData.tickets}`);
});

app.post('/subscribe', (req, res) => {
    const options = {
        url: `https://${process.env.MC_INSTANCE}.api.mailchimp.com/3.0/lists/${process.env.MC_LIST_ID}`,
        method: `POST`,
        headers: {
            Authorization: `auth ${process.env.MC_API_KEY}`
        },
        body: JSON.stringify({
            members: [{
                email_address: req.body.email,
                status: 'subscribed'
            }]
        })
    };
    request(options, (err, response, body) => {
        if (err) res.sendStatus(400);
        else(response.statusCode === 200) ? res.sendStatus(200) : res.sendStatus(418);
    });
});

app.get('/api/dates', async (req, res) => {
    const apiCall = (type) => `https://api.songkick.com/api/3.0/artists/10191154/${type}.json?apikey=${process.env.SK_API}`;
    try {
        Promise.allSettled([fetch(apiCall('calendar'))
                .then(data => data.json()), fetch(apiCall('gigography'))
                .then(data => data.json())
            ])
            .then(data => {

                if (data[0].value.resultsPage.totalEntries !== 0) {
                    console.log('has both');
                    
                    res.send(data[0].value.resultsPage.results.event.concat(data[1].value.resultsPage.results.event));
                } else {
                    console.log('has none');
                    
                    res.send(data[1].value.resultsPage.results.event);
                }
            });
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

app.get('/*', (req, res) => {
    res.redirect('/');
});
app.listen(port, function () {
    const startTime = new Date();
    const options = {
        hour: 'numeric',
        minute: 'numeric'
    };
    console.log(`Pent Up! Website up and running, port ${port} on ${startTime.toLocaleDateString("en-US", options)}.`);
});
