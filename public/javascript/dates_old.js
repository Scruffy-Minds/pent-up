window.dataLayer = window.dataLayer || [];
const d = document;
const store = {
    dates: [],
    pastDates: []
};


function getDates() {
    fetch(`/api/dates`)
        .then(res => res.json())
        .then(data => { 
            data.event.forEach((v, i, a) => {
                store.dates.push(v);
            });
            populateDates(store.dates, 'upcoming-shows');
        });
    fetch(`/api/pastdates`)
        .then(res => res.json())
        .then(data => {
            data.event.forEach((v, i, a) => {
                store.pastDates.push(v);
            });
            populateDates(store.pastDates, 'past-shows');
        });
}

getDates();

function populateDates(data, target) {
    const header = `<div class="show-headers row space-around">
                        <span>Date</span>
                        <span>Venue</span>
                        <span>Event Link</span>
                    </div>`
    let dateTiles = header;
    
    // maybe check if there are any dates here?
    data.forEach((v) => {
        const dt = new Date(v.start.date);
        const info = {
            date: `${dt.getUTCMonth()+1}-${dt.getUTCDate().toString().padStart(2, "0")}-${dt.getUTCFullYear()}`,
            time: v.start.time,
            location: `${v.venue.metroArea.displayName}, ${v.venue.metroArea.state.displayName}`,
            eventUrl: v.uri,
            venue: {
                name: v.venue.displayName,
                url: v.venue.uri,
                id: v.venue.id,
                city: v.venue.metroArea.displayName,
                state: v.venue.metroArea.state.displayName,
                country: v.venue.metroArea.country.displayName,
                latitude: v.venue.lat,
                longitude: v.venue.lng
            },
            ageLimit: v.ageRestriction,
            bands: v.performance.map((v) => v.displayName)
        }
        dateTiles = dateTiles + generateTile(info);
    }); 
    d.getElementById(target).innerHTML = dateTiles;
}

function generateTile(data) {
    console.log(data);
    
    const tile = `<div class="bkg-glass glow show row space-around">
        <div class="date">${data.date}</div>
        <div class="venue">
            <span>${data.venue.name}</span>
            <span>${data.venue.city}, ${data.venue.state}</span></div>
        <div class="event">
            <a href="${data.eventUrl}" target="_blank">
                <img src="/images/icons/icon-link.png" alt="Event Link">
            </a>
        </div>
    </div>`    
    return tile;
}

