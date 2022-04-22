function toggleHidden(element) {
    const isPrimary = ((Array.from(element.classList)).find(e => e === 'primary') === 'primary') ? true : false;
    if (isPrimary != true) element.classList.toggle('hidden');
}

function adjustStreamingWidth() {
    const third = d.querySelector('#streaming :nth-child(3) img');
    if (d.getElementById('streaming').offsetWidth >= 550) {
        third.classList.remove('hidden');
        third.classList.add('primary');
    } else {
        third.classList.add('hidden');
        third.classList.remove('primary');
    }
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

window.addEventListener('resize', function (event) {
    adjustStreamingWidth();
}, true);

adjustStreamingWidth();