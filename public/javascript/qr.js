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

document.querySelectorAll('.listen-btn').forEach(x => {
    x.addEventListener('click', () => {
        switch (x.id) {
            case 'applemusic':
                window.open('https://music.apple.com/us/artist/pent-up/1613290339', '_blank');
                break;
            case 'spotify':
                window.open('https://open.spotify.com/artist/4WPVheZNfKNT9plPbMUjQU?si=H8N5sgH9Rs-ppkL9vq9_Og', '_blank');
                break;
            default:
                console.log(`Uh oh!`);
        }
    });
});

document.querySelector('.copyright').innerHTML = `&copy;${today.getFullYear()}, Pent Up! All rights reserved.`;

gtag('js', new Date());
gtag('config', 'G-7QT7P357RK');