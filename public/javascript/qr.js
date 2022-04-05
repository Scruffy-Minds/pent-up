window.dataLayer = window.dataLayer || [];
const d = document;
const store = [{ streamersExpanded: false }];

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

function toggleHidden(element) {
    const isPrimary = ((Array.from(element.classList)).find(e => e === 'primary') === 'primary') ? true : false;
    if (isPrimary != true) element.classList.toggle('hidden');
}