d.querySelector('.copyright').classList.add('hidden');
d.getElementById('footer').classList.add('hidden');

function addListeners(arrows) {
    arrows.forEach((v) => {
        v.addEventListener('click', () => {
            let arrowStatus = v.getElementsByTagName('img')[0].src;

            // hide any extended sections that are visible before expanding the next one.
            d.querySelectorAll('.extended').forEach((el) => {
                if (!String(el.classList).includes('hidden')) {
                    el.classList.add('hidden');
                }
            });

            // hide any details sections that are visible before expanding the next one.
            d.querySelectorAll('.details').forEach((el) => {
                if (!String(el.classList).includes('hidden')) {
                    el.classList.add('hidden');
                }
            });

            // change any up-arrows to down-arrows before expanding the next one.
            d.querySelectorAll('.toggle-arrow').forEach((el) => {
                if (String(el.getElementsByTagName('img')[0].src).includes('uparrow')) {
                    el.getElementsByTagName('img')[0].src = '/images/icons/icon-downarrow.png';
                }
            });

            if (arrowStatus.includes('downarrow')) {
                // expand the clicked event
                const elementId = v.className.split(" ")[0];
                v.getElementsByTagName('img')[0].src = '/images/icons/icon-uparrow.png';
                const extended = d.getElementsByClassName(`extended ${elementId}`)[0];
                const extendedSpans = extended.getElementsByTagName('span');
                if (extendedSpans[1].innerHTML.includes('loading')) {
                    getVenueAddress(extendedSpans[1], extendedSpans[2]);
                }
                extended.classList.remove('hidden')
                d.getElementsByClassName(`details ${elementId}`)[0].classList.remove('hidden');
            }
        });
    });
}

function generateTile(data) {
    const tile = `<div class="${data.eventId} event-tile column jc-space-around">
                    <div class="event-info row jc-space-between">
                        <span class="col-date event-date">${data.date}</span>
                        <span class="${data.eventId} col-venue event-venue">${data.venue.name}</span>
                        <span class="col-location event-location">${data.venue.city}, ${data.venue.state}</span>
                    </div>
                    <div div class = "${data.eventId} event-info extended row jc-space-around hidden" >
                        <span class="col-date event-time">${getTime(data.datetime)}</span>
                        <span class="${data.venue.id} col-venue event-address"><img src="/images/loading-dots.gif" alt="loading"></span>
                        <span class = "${data.venue.id} col-location event-zip"></span>
                    </div>
                    <div class = "${data.eventId} event-info details row jc-space-between hidden">
                        <span class="event-age-limit"><img src="${getAgeIcon(data.ageLimit)}" alt=""></span>
                        <span class="event-bands">${data.bands.join(', ')}</span>
                        <span class="sk-link"><a href="${data.eventUrl}" target="_blank"><img src="/images/songkick/sk-badge/sk-badge-white.png" alt="SongKick"></a></span>
                    </div>
                <div class="${data.eventId} toggle-arrow row jc-space-around">
                    <img src="/images/icons/icon-downarrow.png" alt="down arrow">
                </div>
            </div>`
    return tile;
}

function getAgeIcon(data) {
    const age = Number(data);
    if (age === 0) {
        return `/images/icons/age/21.png`;
    } else if (age < 12) {
        return `/images/icons/age/3.png`;
    } else if (age < 16) {
        return `/images/icons/age/12.png`;
    } else if (age < 18) {
        return `/images/icons/age/16.png`;
    } else if (age < 21) {
        return `/images/icons/age/18.png`;
    } else return `/images/icons/age/21.png`;
}

function getTime(datetime) {
    const date = new Date(datetime);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes.toString().padStart(2, '0');
    return hours + ':' + minutes + ampm;
}

function getShowInfo() {
    fetch('api/dates')
        .then(res => res.json())
        .then(res => {
            
            function compare(a, b) {
                if (a.start.datetime < b.start.datetime) return -1;
                else return 1;
            }
            
            const allDates = res.sort(compare);
            const currentDates = allDates.filter(date => new Date(date.start.datetime) >= new Date());
            const pastDates = allDates.filter(date => new Date(date.start.datetime) < new Date());

            populateDates(currentDates, 'current-shows');
            populateDates(pastDates.reverse(), 'past-shows');
            d.getElementsByTagName('hr')[0].classList.remove('hidden');
            d.querySelector('.copyright').classList.remove('hidden');
            d.querySelector('.songkick').classList.remove('hidden');
            d.getElementById('footer').classList.remove('hidden');
            addListeners(d.querySelectorAll('.toggle-arrow'));
        })
        .catch(err => console.error(err));
}

function getVenueAddress(address, zip) {
    const venueId = address.className.split(" ")[0];
    fetch(`/api/venue-details/${venueId}`)
        .then(res => res.json())
        .then(data => {
            address.innerHTML = data.venue.street;
            zip.innerHTML = data.venue.zip;
        });
}

function populateDates(data, target) {
    let dateTiles = '';
    const header = `<div class="event-headers row jc-space-around">
                <span class="col-date"">Date</span>
                <span class="col-venue">Venue</span>
                <span class="col-location">Location</span>
            </div>`;
    const pastShows = `<div class="title row jc-center">
                <span>${(target === 'past-shows' ? '&mdash; PAST DATES &mdash;' : '&mdash; CURRENT DATES &mdash;')}</span>
                
            </div>`;
        dateTiles = dateTiles + pastShows + header;

    if (data.length > 0) {
        data.forEach((v) => {
            const dt = new Date(v.start.datetime);
            if (v.status === 'cancelled') return;
            const info = {
                eventId: v.id,
                date: `${dt.getMonth()+1}-${dt.getDate().toString().padStart(2, "0")}-${dt.getFullYear().toString().slice(-2)}`,
                time: v.start.datetime,
                datetime: v.start.datetime,
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
                bands: v.performance.map((v) => v.displayName.replace(/ /g, '\u00a0'))
            };
            dateTiles = dateTiles + generateTile(info);
        }); 
        d.getElementById(target).innerHTML = dateTiles;
    } else {
        dateTiles = dateTiles + `<span class="noshows">\&mdash;No dates booked at present\&mdash;</span>`;
        d.getElementById(target).innerHTML = dateTiles;
    }
}

getShowInfo();