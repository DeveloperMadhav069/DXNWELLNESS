document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    emailjs.send("service_ev5htjk", "template_d3qj72d", {
        name: name,
        email: email,
        phone: phone,
        message: message
    })
    .then(function (response) {
        console.log('Message sent successfully!', response);
        document.getElementById('form-status').innerText = '✅ Message sent successfully!';
    })
    .catch(function (error) {
        console.error('Failed to send message', error);
        document.getElementById('form-status').innerText = '❌ Failed to send message. Please try again.';
    });

    document.getElementById('contact-form').reset();
});

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/i;
    return re.test(email.toLowerCase());
}
