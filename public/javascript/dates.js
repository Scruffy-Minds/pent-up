window.dataLayer = window.dataLayer || [];
const d = document;
const store = {
    dates: [],
    pastDates: []
};

console.log(store);

function getDates() {
    fetch(`/api/dates`)
        .then(res => res.json())
        .then(data => { 
            console.log(data);
            data.event.forEach((v, i, a) => {
                store.dates.push(v);
            });
            populateDates(store.dates, 'upcoming-shows');

        });
    fetch(`/api/pastdates`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            data.event.forEach((v, i, a) => {
                store.pastDates.push(v);
            });
            populateDates(store.pastDates, 'past-shows');

        });
}

getDates();

function populateDates(data, target) {
    const dateTiles = d.createDocumentFragment();
    data.forEach((v) => {
        const dt = new Date(v.start.date);
        const info = {
            date: `${dt.getUTCMonth()+1}-${dt.getUTCDate().toString().padStart(2, "0")}-${dt.getUTCFullYear()}`,
            time: v.start.time,
            location: v.location.city,
            tickets: v.uri,
            venue: v.venue.displayName
        }

        const tile = generateTile(info);

        dateTiles.appendChild(tile);
        d.querySelector('.loading').classList.add('hidden');
        d.getElementsByTagName('hr')[0].classList.remove('hidden');
        console.log(d.getElementsByTagName('hr'));
        
        d.getElementById(target).appendChild(tile);

    });    
}



function generateTile(data) {
    const dFrag = d.createDocumentFragment();
    const tile = d.createElement('div');
    const date = d.createElement('div');
    const venue = d.createElement('div');
    const venueName = d.createElement('span');
    const venueLocation = d.createElement('span');
    const ticket = d.createElement('div');
    const ticketLink = d.createElement('a');
    const ticketImage = d.createElement('img');
    
    tile.classList.add('show', 'row', 'space-around');
    date.classList.add('date');
    venue.classList.add('venue');
    ticket.classList.add('ticket');
    ticketImage.src = '/images/icons/icon-ticket.png';
    ticketImage.alt = 'Tickets';
    ticketLink.href = data.tickets;
    ticketLink.target = '_blank';

    date.innerHTML = data.date;
    venueName.innerHTML = data.venue;
    venueLocation.innerHTML = data.location;
    
    ticketLink.appendChild(ticketImage);
    ticket.appendChild(ticketLink);
    venue.appendChild(venueName);    
    venue.appendChild(venueLocation);
    tile.appendChild(date);
    tile.appendChild(venue);
    tile.appendChild(ticket);

    return tile;
}

