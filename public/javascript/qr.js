const third = d.querySelector('#streaming :nth-child(3) img').classList;


function toggleHidden(element) {
    const isPrimary = ((Array.from(element.classList)).find(e => e === 'primary') === 'primary') ? true : false;
    if (isPrimary != true) element.classList.toggle('hidden');
}

d.querySelector('.more').addEventListener('click', () => {
    const streamers = Array.from(d.querySelectorAll('.listen-btn'));
    if (store.streamersExpanded === true) {
        d.querySelector('.more').innerHTML = 'Tap here for more streaming services';
        store.streamersExpanded = false;
    } else {
        d.querySelector('.more').innerHTML = 'Tap here to show fewer streaming services';
        store.streamersExpanded = true;
    }
        streamers.forEach((v, i, a) => {
            toggleHidden(v);
        });
});

window.addEventListener('resize', (event) => {
    if (d.getElementById('streaming').offsetWidth < 550) {
        third.remove('primary');
        if (store.streamersExpanded === true) {
            third.remove('hidden');
        } else third.add('hidden');
    }
    if (d.getElementById('streaming').offsetWidth >= 550) {
        third.add('primary');
        third.remove('hidden');
    }
}, true);

if (d.getElementById('streaming').offsetWidth >= 550) {
    third.remove('hidden');
    third.add('primary');
}

d.querySelector('.news').innerHTML = `<span>New EP drops on 5/05! Pre-save "Pretty Good" on Spotify <a href="https://distrokid.com/hyperfollow/pentup3/pretty-good" target="_blank"><foo style="text-decoration: underline; font-weight: 700;">here</foo></a>!</span>`;
