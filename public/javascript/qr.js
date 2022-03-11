window.dataLayer = window.dataLayer || [];

const today = new Date();
const buttons = document.querySelectorAll('.button');
const sites = [
    {name: 'Official Website', id: 'website', url: 'http://www.pentup.band', type: 'website', target: '_self'},
    {name: 'ReverbNation', id: 'reverbnation', url: 'https://www.reverbnation.com/pentup', type: 'website', target: '_blank'},
    {name: 'Bandcamp', id: 'bandcamp', url: 'https://pentup-rock.bandcamp.com/', type: 'website', target: '_blank'},
    {name: 'Apple Music', id: 'applemusic', url: 'https://music.apple.com/us/artist/pent-up/1613290339', type: 'streaming', target: '_self'},
    {name: 'Spotify', id: 'spotify', url: 'https://open.spotify.com/artist/4WPVheZNfKNT9plPbMUjQU?si=H8N5sgH9Rs-ppkL9vq9_Og', type: 'streaming', target: '_self'},
    {name: 'Facebook', id: 'facebook', url: 'https://www.facebook.com/pentup.band/', type: 'social', target: '_blank'},
    {name: 'Twitter', id: 'twitter', url: 'https://twitter.com/PentUpRock', type: 'social', target: '_blank'},
    {name: 'Instagram', id: 'instagram', url: 'https://www.instagram.com/pent_up_band/', type: 'social', target: '_blank'},
    {name: 'YouTube', id: 'youtube', url: 'https://www.youtube.com/channel/UCHd5r2W_8tvglPx4LJ4yKdA', type: 'social', target: '_blank'},
    {name: 'Mail', id: 'mail', url: 'mailto:pent.up.rock@gmail.com?subject=You have an owl?!', type: 'social', target: '_self'}
];

function handleClick(id) {
    const data = switches(id);
    window.open(data.url, data.target);
}

function objectify(x, y) {
    return {url: x, target: y};
}

function switches(id) {
    switch (id) {
        case 'applemusic':
            return objectify('https://music.apple.com/us/artist/pent-up/1613290339', '_self');
        case 'spotify':
            return objectify('https://open.spotify.com/artist/4WPVheZNfKNT9plPbMUjQU?si=H8N5sgH9Rs-ppkL9vq9_Og', '_self');
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
document.querySelector('.newsflash').innerHTML = `New single 'Self-Titled' out now on all major streaming services!`;
