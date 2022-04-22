window.dataLayer = window.dataLayer || [];
const d = document;
const store = [{
    streamersExpanded: false
}];

const newsletterSignupForm = document.getElementById('subscribe');
if (newsletterSignupForm) newsletterSignupForm.addEventListener('submit', handleNewsletterSubscription);

function handleNewsletterSubscription(event) {
    event.preventDefault();
    const addy = document.querySelector('input[name="email"]').value;
    const clearField = () => document.getElementById('email-address').value = '';
    const validateEmail = (value) => { // Validate email address
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value.trim());
    };

    if (validateEmail(addy)) {
        fetch(event.currentTarget.action, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'email': addy })
            })
            .then(res => {
                if (res.status === 200) {
                    alert(`You've been subscribed at ${addy}!`);
                    clearField();
                } else alert(`Something went wrong, please contact us to subscribe.`);
            });
    } else {
        alert('Please enter a valid email address.');
        clearField();
    }
}