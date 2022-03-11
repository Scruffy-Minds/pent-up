window.dataLayer = window.dataLayer || [];

const today = new Date();
const weblinks = {
    website: 'http://www.pentup.band',
    reverbnation: 'https://www.reverbnation.com/pentup',
    bandcamp: 'https://pentup-rock.bandcamp.com/'
};
const buttons = document.querySelectorAll('.button');

function gtag() {
    dataLayer.push(arguments);
}

function handleClick(id) {
    const data = switches(id);
    window.open(data.url, data.target);
    console.log(data);
}

function objectify(x, y) {
    return {url: x, target: y};
}

function switches(id) {
    switch (id) {
        case 'applemusic':
            return objectify('https://music.apple.com/us/artist/pent-up/1613290339', '_blank');
        case 'spotify':
            return objectify('https://open.spotify.com/artist/4WPVheZNfKNT9plPbMUjQU?si=H8N5sgH9Rs-ppkL9vq9_Og', '_blank');
        case 'website':
            return objectify('http://www.pentup.band', '_self');
        case 'reverbnation':
            return objectify('https://www.reverbnation.com/pentup', '_blank');
        case 'bandcamp':
            return objectify('https://pentup-rock.bandcamp.com/', '_blank');
        case 'facebook':
            return objectify('https://www.facebook.com/pentup.band/', '_blank');
        case 'twitter':
            return objectify('https://twitter.com/PentUpRock', '_blank');
        case 'instagram':
            return objectify('https://www.instagram.com/pent_up_band/', '_blank');
        case 'youtube':
            return objectify('https://www.youtube.com/channel/UCHd5r2W_8tvglPx4LJ4yKdA', '_blank');
        case 'mail':
            return objectify(`mailto:pent.up.rock@gmail.com?subject=You have an owl?!`, '_self');
        default:
            console.log(`Something went wrong.`);
    }
}

document.querySelectorAll('.button, .social-icon').forEach(x => {
    x.addEventListener('click', () => {
        handleClick(x.id);
    });
});

document.querySelector('.copyright').innerHTML = `&copy;${today.getFullYear()}, Pent Up! All rights reserved.`;

gtag('js', new Date());
gtag('config', 'G-7QT7P357RK');