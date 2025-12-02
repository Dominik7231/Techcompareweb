// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 15, 26, 0.98)';
        } else {
            navbar.style.background = 'rgba(15, 15, 26, 0.95)';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        if (hero && scrolled < window.innerHeight) {
            const heroImage = document.querySelector('.hero-image');
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        }
    });

    // Screenshot hover effect
    const screenshots = document.querySelectorAll('.screenshot-item');
    screenshots.forEach(screenshot => {
        screenshot.addEventListener('mouseenter', function() {
            screenshots.forEach(s => {
                if (s !== this) {
                    s.style.opacity = '0.6';
                }
            });
        });

        screenshot.addEventListener('mouseleave', function() {
            screenshots.forEach(s => {
                s.style.opacity = '1';
            });
        });
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
