/* Basic JavaScript for Prestige Pressure Washing website */

document.addEventListener('DOMContentLoaded', function() {
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you as soon as possible.');
            contactForm.reset();
        });
    }

    // Mobile menu toggle functionality could be added here
    // This is a placeholder for future mobile menu implementation
});
