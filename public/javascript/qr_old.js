window.dataLayer = window.dataLayer || [];
const d = document;
const store = [{moreToggle: true}];

function addListeners() {
    d.querySelectorAll('.button, .social-icon').forEach(x => {
        x.addEventListener('click', () => {
            handleClick(x.id);
        });
    });
    d.querySelector('.more').addEventListener('click', () => {
        d.getElementById('streaming').innerHTML = '';
        d.getElementById('streaming').appendChild(generateStreamers(store.filter(x => x.type === 'streaming'), 'all'));
        addListeners();
    })
}

// This function generates all the buttons on the page and then adds listeners to them.
function generateButtons(buttonData) {
    const dFrag = d.createDocumentFragment();  
    buttonData.forEach((v, i, a) => {
        const button = d.createElement('div');
        const buttonLabel = d.createElement('span');
        button.classList.add('button');
        button.setAttribute('id', v.id);
        buttonLabel.innerHTML = v.name;
        button.appendChild(buttonLabel);
        dFrag.appendChild(button);
    });
    return dFrag;
}

// This function generates the Streaming Service buttons at the top of the page
function generateStreamers(streamerData, qty) {
    
    const streamers = (() => {
        if (qty === 'primary') {
            console.log('Primary');           
            return streamerData.filter(x => x.id === 'applemusic' || x.id === 'spotify');
        } else {
            console.log(streamerData);
            
            console.log(`Not Primary`);
            return streamerData.filter(x => x.type === 'streaming');
        }
    })();
    console.log(streamers);
    
    const dFrag = d.createDocumentFragment();
    streamers.forEach((v, i, a) => {
        const streamer = d.createElement('img');
        streamer.setAttribute('id', v.id);
        streamer.classList.add('listen-btn', 'button');
        streamer.src = `/images/buttons/${v.id}_btn.png`;
        streamer.setAttribute('alt', v.alt);
        dFrag.appendChild(streamer);
    });

        const moreButton = d.createElement('span');
        moreButton.classList.add('more', 'row', 'center');
        moreButton.innerHTML = (qty === 'primary') ? 'Tap here for more streaming services' : 'Tap for less';
        dFrag.appendChild(moreButton);
    return dFrag;
}

// This function generates the social buttons along the bottom of the page.
function generateSocials(socialData) {
    const dFrag = d.createDocumentFragment();
    socialData.forEach((v, i, a) => {
        const image = d.createElement('img');
        image.setAttribute('id', v.id);
        image.classList.add('social-icon');
        image.src = `/images/icons/icon-${v.id}.png`;
        v.alt === undefined ? image.setAttribute('alt', v.name) : image.setAttribute('alt', v.alt);
        dFrag.appendChild(image);
    });
    return dFrag;
}

function getData() {
    fetch('/javascript/qr_data.json')
        .then(response => response.json())
        .then(jsondata => populateData(jsondata));
}

function handleClick(id) {   
    const site = store.find(x => x.id === id);
    window.open(site.url, site.target);
}

function populateData(data) {
    data.sites.forEach(x => {
        store.push({name: x.name, id: x.id, url: x.url, target: x.target, type: x.type, alt: x.alt});        
    });

    d.querySelector('.news span').innerHTML = data.news;
    d.getElementById('buttons').appendChild(generateButtons(data.sites.filter(x => x.type === 'website')));
    d.getElementById('socials').appendChild(generateSocials(data.sites.filter(x => x.type === 'social')));
    d.getElementById('streaming').prepend(generateStreamers(data.sites.filter(x => x.type === 'streaming'), 'primary'));
    addListeners();
}

getData();
d.querySelector('.copyright').innerHTML = `&copy;${new Date().getFullYear()}, Pent Up! All rights reserved.`;

