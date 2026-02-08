// Main JavaScript for Taste of Calgary Website

// ==================== Redirect any page (except home) to home on refresh ====================
const currentPage = window.location.pathname;
const isHomePage = currentPage.endsWith('index.html') || currentPage.endsWith('/');
const isRefresh = performance.navigation.type === 1;

if (!isHomePage && isRefresh) {
    window.location.href = 'index.html';
}

// ==================== Mobile Navigation Toggle ====================
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
});

// ==================== Smooth Scrolling for Anchor Links ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== Contact Form Validation ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // Validate name
        if (name === '' || name.length < 2) {
            showError('name', 'Please enter a valid name (at least 2 characters)');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate subject
        if (subject === '') {
            showError('subject', 'Please select a subject');
            isValid = false;
        }
        
        // Validate message
        if (message === '' || message.length < 10) {
            showError('message', 'Please enter a message (at least 10 characters)');
            isValid = false;
        }
        
        // If valid, submit form
        if (isValid) {
            submitForm(name, email, subject, message);
        }
    });
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    const errorElement = document.getElementById(fieldId + 'Error');
    
    formGroup.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.style.display = 'none';
    });
    
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('error');
    });
}

function submitForm(name, email, subject, message) {
    // Create mailto link with form data
    const phone = document.getElementById('phone').value.trim();
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone || 'Not provided'}%0D%0ASubject: ${subject}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`;
    const mailtoLink = `mailto:info@tasteofcalgary.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    
    // Show success message
    const formSuccess = document.getElementById('formSuccess');
    contactForm.style.display = 'none';
    formSuccess.style.display = 'block';
    
    // Open mailto link after a short delay
    setTimeout(() => {
        window.location.href = mailtoLink;
        
        // Reset form and hide success message after 5 seconds
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'flex';
            formSuccess.style.display = 'none';
        }, 5000);
    }, 1000);
}

// ==================== Scroll Animations ====================
// Add animation class to elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.highlight-card, .service-card, .value-card, .team-member, .mv-card, .service-detail, .info-card, .faq-item, .menu-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// ==================== Sticky Header Scroll Effect ====================
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow on scroll
    if (scrollTop > 50) {
        header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.15)';
    }
    
    lastScrollTop = scrollTop;
});

// ==================== WhatsApp Button Visibility ====================
const whatsappButton = document.querySelector('.whatsapp-float');
if (whatsappButton) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            whatsappButton.style.opacity = '1';
            whatsappButton.style.visibility = 'visible';
        } else {
            whatsappButton.style.opacity = '0';
            whatsappButton.style.visibility = 'hidden';
        }
    });
    
    // Set initial state
    if (window.pageYOffset <= 300) {
        whatsappButton.style.opacity = '0';
        whatsappButton.style.visibility = 'hidden';
    }
}

// ==================== Page Transition Effect ====================
// Add smooth page transition when navigating
document.addEventListener('DOMContentLoaded', function() {
    // Fade in page on load
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Smooth transition when clicking internal links
    const internalLinks = document.querySelectorAll('a:not([href^="#"]):not([href^="http"]):not([href^="mailto"]):not([href^="tel"]):not([target="_blank"])');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
});

// ==================== Button Hover Effects ====================
// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== Image Lazy Loading (for future use) ====================
// This will be useful when you add actual images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ==================== Service Cards Interaction ====================
document.querySelectorAll('.service-card, .highlight-card, .value-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ==================== Console Welcome Message ====================
console.log('%c🍽️ Welcome to Taste of Calgary! ', 'background: #FF6B35; color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%cExperience culinary excellence in the heart of Calgary', 'color: #C1292E; font-size: 14px;');

// ==================== Performance Monitoring ====================
window.addEventListener('load', function() {
    // Log page load time
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }
});
