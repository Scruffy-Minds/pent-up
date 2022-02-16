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

// display Coming Soon if streaming buttons are clicked
document.querySelectorAll('.listen-btn').forEach(x => {
    x.addEventListener('click', () => {
        document.querySelector('#coming-soon').classList.remove('hidden');
    });
});

document.querySelector('.copyright').innerHTML = `&copy;${today.getFullYear()}, Pent Up! All rights reserved.`;

gtag('js', new Date());
gtag('config', 'G-7QT7P357RK');