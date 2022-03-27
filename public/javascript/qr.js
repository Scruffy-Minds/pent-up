window.dataLayer = window.dataLayer || [];
const d = document;
const store = [];

function addListeners() {
    d.querySelectorAll('.button, .social-icon').forEach(x => {
        x.addEventListener('click', () => {
            handleClick(x.id);
        });
    });
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
function generatePrimaryStreamers(streamerData) {
    const primaries = streamerData.filter(x => x.id === 'applemusic' || x.id === 'spotify');
    const dFrag = d.createDocumentFragment();
    primaries.forEach((v, i, a) => {
        const streamer = d.createElement('img');
        streamer.setAttribute('id', v.id);
        streamer.classList.add('listen-btn', 'button');
        streamer.src = `/images/buttons/${v.id}_btn.png`;
        streamer.setAttribute('alt', v.alt);
        dFrag.appendChild(streamer);
    });
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
        store.push({id: x.id, url: x.url, target: x.target});        
    });

    d.querySelector('.newsflash').innerHTML = data.news;
    d.getElementById('buttons').appendChild(generateButtons(data.sites.filter(x => x.type === 'website')));
    d.getElementById('socials').appendChild(generateSocials(data.sites.filter(x => x.type === 'social')));
    d.getElementById('streaming').prepend(generatePrimaryStreamers(data.sites.filter(x => x.type === 'streaming')));
    addListeners();
}

getData();
d.querySelector('.copyright').innerHTML = `&copy;${new Date().getFullYear()}, Pent Up! All rights reserved.`;
