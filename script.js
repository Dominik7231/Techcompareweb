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

// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// Back to Top Button
document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Particles Effect
document.addEventListener('DOMContentLoaded', function() {
    const particlesContainer = document.getElementById('particles');
    
    if (particlesContainer) {
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random size
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random animation delay
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            
            // Random color (purple or cyan)
            particle.style.background = Math.random() > 0.5 ? '#8B5CF6' : '#06B6D4';
            
            particlesContainer.appendChild(particle);
        }
    }
});

// Counter Animation for Stats
document.addEventListener('DOMContentLoaded', function() {
    const stats = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateCounter(element, target, suffix = '') {
        let current = 0;
        const increment = target / 30;
        const duration = 1500;
        const stepTime = duration / 30;
        
        element.classList.add('counting');
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(counter);
                element.classList.remove('counting');
            }
            element.textContent = Math.floor(current) + suffix;
        }, stepTime);
    }
    
    function checkStats() {
        if (animated) return;
        
        const heroSection = document.querySelector('.hero-stats');
        if (!heroSection) return;
        
        const rect = heroSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
            animated = true;
            stats.forEach(stat => {
                const text = stat.textContent;
                if (text === '9+') {
                    animateCounter(stat, 9, '+');
                } else if (text === '100+') {
                    animateCounter(stat, 100, '+');
                }
                // AI stays static
            });
        }
    }
    
    window.addEventListener('scroll', checkStats);
    checkStats(); // Check on load
});

// Typing Effect for Hero Title (optional enhancement)
document.addEventListener('DOMContentLoaded', function() {
    const gradientText = document.querySelector('.hero-text .gradient-text');
    if (gradientText) {
        const text = gradientText.textContent;
        gradientText.textContent = '';
        gradientText.style.borderRight = '2px solid var(--primary-color)';
        
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                gradientText.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                gradientText.style.borderRight = 'none';
            }
        }, 80);
    }
});
