document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        // Create a new FormData object
        const formData = new FormData(contactForm);

        // Send the form data via Fetch API
        fetch('submit-form.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json()) // Expect JSON response from PHP
        .then(data => {
            // Remove any previous alert classes
            formFeedback.classList.remove('alert-success', 'alert-danger');

            if (data.status === 'success') {
                // Add success class and update text
                formFeedback.classList.add('alert-success');
                formFeedback.textContent = data.message;
                contactForm.reset(); // Reset the form fields
            } else {
                // Add error class and update text
                formFeedback.classList.add('alert-danger');
                formFeedback.textContent = data.message;
            }

            // Show the alert container
            formFeedback.style.display = 'block';

            // Automatically hide the alert after 5 seconds
            setTimeout(() => {
                formFeedback.style.display = 'none';
            }, 5000);

        })
        .catch(error => {
            // On network or other errors:
            formFeedback.classList.remove('alert-success', 'alert-danger');
            formFeedback.classList.add('alert-danger');
            formFeedback.textContent = 'There was an error submitting the form. Please try again later.';
            formFeedback.style.display = 'block';

            console.error('Error:', error);

            // Automatically hide the alert after 5 seconds
            setTimeout(() => {
                formFeedback.style.display = 'none';
            }, 000);
        });
    });
});
