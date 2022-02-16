const weblinks = {
    website: 'http://www.pentup.band',
    reverbnation: 'https://www.reverbnation.com/pentup',
    bandcamp: 'https://pentup-rock.bandcamp.com/'
};

const buttons = document.querySelectorAll('.button');

// display Coming Soon if streaming buttons are clicked
document.querySelectorAll('.listen-btn').forEach(x => {
    x.addEventListener('click', () => {
        document.querySelector('#coming-soon').classList.remove('hidden');
    });
});
