document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent default form submission behavior

        // Create a new FormData object
        const formData = new FormData(contactForm);

        // Send the form data via Fetch API to the Formspree endpoint
       fetch('https://formspree.io/f/mzzbqeve', {
    method: 'POST',
    body: formData,
    headers: {
        'Accept': 'application/json', 
    },
})
    .then((response) => {
        console.log('Response received:', response); // Debugging
        if (response.ok) {
            formFeedback.classList.remove('alert-danger');
            formFeedback.classList.add('alert-success');
            formFeedback.textContent = 'Thank you! Your message has been sent successfully.';
            contactForm.reset(); // Clear the form fields
        } else {
            throw new Error('Submission failed. Check Formspree configuration.');
        }
    })
    .catch((error) => {
        formFeedback.classList.remove('alert-success');
        formFeedback.classList.add('alert-danger');
        formFeedback.textContent = 'There was an error submitting the form. Please try again.';
        console.error('Error:', error);
    })
    .finally(() => {
        formFeedback.style.display = 'block';
        setTimeout(() => {
            formFeedback.style.display = 'none';
        }, 5000);
    });

    });
});
