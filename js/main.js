/**
 * Prestige Pressure Washing - Main JavaScript
 * Implements smooth scrolling, responsive navigation, form validation, and gallery functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavigation();
    initSmoothScrolling();
    initFormValidation();
    initGalleryFilters();
    initScrollAnimations();
});

/**
 * Navigation functionality
 * - Toggle mobile menu
 * - Change header on scroll
 */
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const header = document.getElementById('header');
    
    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle navigation bar appearance
            if (navToggle.classList.contains('active')) {
                navToggle.querySelector('.bar:nth-child(1)').style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                navToggle.querySelector('.bar:nth-child(2)').style.opacity = '0';
                navToggle.querySelector('.bar:nth-child(3)').style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                navToggle.querySelector('.bar:nth-child(1)').style.transform = 'none';
                navToggle.querySelector('.bar:nth-child(2)').style.opacity = '1';
                navToggle.querySelector('.bar:nth-child(3)').style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navToggle.click();
            }
        });
    });
    
    // Change header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.visibility = 'visible';
            } else {
                backToTopButton.style.opacity = '0';
                backToTopButton.style.visibility = 'hidden';
            }
        });
    }
}

/**
 * Form validation
 */
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const phoneField = document.getElementById('phone');
            const serviceField = document.getElementById('service');
            const messageField = document.getElementById('message');
            
            // Reset previous error states
            const formFields = [nameField, emailField, phoneField, serviceField, messageField];
            formFields.forEach(field => {
                field.style.borderColor = '';
            });
            
            // Validate fields
            let isValid = true;
            
            // Name validation
            if (!nameField.value.trim()) {
                nameField.style.borderColor = 'red';
                isValid = false;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value.trim())) {
                emailField.style.borderColor = 'red';
                isValid = false;
            }
            
            // Phone validation
            const phoneRegex = /^[\d\s\-\(\)]+$/;
            if (!phoneRegex.test(phoneField.value.trim()) || phoneField.value.trim().length < 10) {
                phoneField.style.borderColor = 'red';
                isValid = false;
            }
            
            // Service validation
            if (serviceField.value === '') {
                serviceField.style.borderColor = 'red';
                isValid = false;
            }
            
            // Message validation
            if (!messageField.value.trim()) {
                messageField.style.borderColor = 'red';
                isValid = false;
            }
            
            // If form is valid, show success message
            if (isValid) {
                // In a real implementation, this would send the form data to a server
                // For this demo, we'll just show a success message
                contactForm.innerHTML = `
                    <div class="form-success">
                        <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--primary-green); margin-bottom: 1rem;"></i>
                        <h3>Thank You!</h3>
                        <p>Your message has been sent successfully. We'll get back to you shortly.</p>
                    </div>
                `;
            }
        });
    }
}

/**
 * Gallery filters functionality
 */
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.work-filter');
    const workItems = document.querySelectorAll('.work-item');
    
    if (filterButtons.length && workItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter work items
                workItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Initialize lightbox for gallery items
    const workLinks = document.querySelectorAll('.work-link');
    if (workLinks.length) {
        workLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the parent work item
                const workItem = this.closest('.work-item');
                
                // Create lightbox elements
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                
                const lightboxContent = document.createElement('div');
                lightboxContent.className = 'lightbox-content';
                
                // Clone the image placeholder for now (in a real site, this would be the actual image)
                const imagePlaceholder = workItem.querySelector('.image-placeholder').cloneNode(true);
                
                // Get work details
                const workTitle = workItem.querySelector('.work-details h3').textContent;
                const workDescription = workItem.querySelector('.work-details p').textContent;
                
                // Create caption
                const caption = document.createElement('div');
                caption.className = 'lightbox-caption';
                caption.innerHTML = `
                    <h3>${workTitle}</h3>
                    <p>${workDescription}</p>
                `;
                
                // Create close button
                const closeButton = document.createElement('span');
                closeButton.className = 'lightbox-close';
                closeButton.innerHTML = '&times;';
                
                // Append elements to lightbox
                lightboxContent.appendChild(imagePlaceholder);
                lightboxContent.appendChild(caption);
                lightbox.appendChild(closeButton);
                lightbox.appendChild(lightboxContent);
                
                // Add lightbox to body
                document.body.appendChild(lightbox);
                
                // Prevent scrolling on body
                document.body.style.overflow = 'hidden';
                
                // Show lightbox with animation
                setTimeout(() => {
                    lightbox.style.opacity = '1';
                }, 10);
                
                // Close lightbox when clicking close button or outside the content
                closeButton.addEventListener('click', closeLightbox);
                lightbox.addEventListener('click', function(e) {
                    if (e.target === lightbox) {
                        closeLightbox();
                    }
                });
                
                function closeLightbox() {
                    lightbox.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(lightbox);
                        document.body.style.overflow = '';
                    }, 300);
                }
            });
        });
    }
}

/**
 * Scroll animations
 */
function initScrollAnimations() {
    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.service-card, .about-content, .work-item, .contact-card');
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe elements
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .about-content, .work-item, .contact-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.animate, .about-content.animate, .work-item.animate, .contact-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .lightbox-content {
            max-width: 80%;
            max-height: 80%;
            position: relative;
        }
        
        .lightbox-content .image-placeholder {
            width: 100%;
            height: 60vh;
            min-height: 300px;
        }
        
        .lightbox-caption {
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px;
            text-align: center;
        }
        
        .lightbox-close {
            position: absolute;
            top: 15px;
            right: 15px;
            color: white;
            font-size: 30px;
            cursor: pointer;
        }
        
        .form-success {
            text-align: center;
            padding: 2rem;
        }
    `;
    document.head.appendChild(style);
}
