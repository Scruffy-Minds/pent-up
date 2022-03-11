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

document.querySelectorAll('.button').forEach(x => {
    x.addEventListener('click', () => {
        switch (x.id) {
            case 'applemusic':
                window.open('https://music.apple.com/us/artist/pent-up/1613290339', '_blank');
                break;
            case 'spotify':
                window.open('https://open.spotify.com/artist/4WPVheZNfKNT9plPbMUjQU?si=H8N5sgH9Rs-ppkL9vq9_Og', '_blank');
                break;
            case 'website':
                window.open('http://www.pentup.band', '_self');
                break;
            case 'reverbnation':
                window.open('https://www.reverbnation.com/pentup', '_blank');
                break;
            case 'bandcamp':
                window.open('https://pentup-rock.bandcamp.com/', '_blank');
                break;
            default:
                console.log(`Something went wrong.`);
        }
    });
});

document.querySelectorAll('.social-icon').forEach(x => {
    x.addEventListener('click', () => {
        switch (x.id) {
            case 'facebook':
                window.open('https://www.facebook.com/pentup.band/', '_blank');
                break;
            case 'twitter':
                window.open('https://twitter.com/PentUpRock', '_blank');
                break;
            case 'instagram':
                window.open('https://www.instagram.com/pent_up_band/', '_blank');
                break;
            case 'youtube':
                window.open('https://www.youtube.com/channel/UCHd5r2W_8tvglPx4LJ4yKdA', '_blank');
                break;
            case 'mail':
                window.open('mailto:pent.up.rock@gmail.com?subject=You have an owl?!', '_self');
                break;
            default:
                console.log(`Something went wrong.`);
        }
    });
});

document.querySelector('.copyright').innerHTML = `&copy;${today.getFullYear()}, Pent Up! All rights reserved.`;

gtag('js', new Date());
gtag('config', 'G-7QT7P357RK');