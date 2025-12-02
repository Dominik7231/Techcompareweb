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

    // Scroll animations - Enhanced with new animation types
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('feature-card') || 
                    entry.target.classList.contains('category-card') ||
                    entry.target.classList.contains('step-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                }
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animationElements = [
        '.fade-in',
        '.slide-in-left',
        '.slide-in-right',
        '.zoom-in',
        '.feature-card',
        '.category-card',
        '.step-card',
        '.screenshot-item',
        '.testimonial-card',
        '.reveal-image'
    ];

    animationElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            observer.observe(el);
        });
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

    // Enhanced parallax effect with mouse movement
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

    // 3D Tilt Effect for cards (Desktop only)
    if (window.innerWidth > 768) {
        const tiltCards = document.querySelectorAll('.tilt-card');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            });
            
            card.addEventListener('mouseleave', function() {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    // Enhanced screenshot hover effect
    const screenshots = document.querySelectorAll('.screenshot-item');
    screenshots.forEach(screenshot => {
        screenshot.addEventListener('mouseenter', function() {
            screenshots.forEach(s => {
                if (s !== this) {
                    s.style.opacity = '0.6';
                    s.style.transform = 'scale(0.95)';
                    s.style.filter = 'blur(2px)';
                }
            });
            this.style.transform = 'scale(1.1) rotateY(5deg)';
            this.style.zIndex = '10';
        });

        screenshot.addEventListener('mouseleave', function() {
            screenshots.forEach(s => {
                s.style.opacity = '1';
                s.style.transform = 'scale(1)';
                s.style.filter = 'none';
                s.style.zIndex = '1';
            });
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // FAQ Accordion
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

    // Back to Top Button
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

    // Particles Effect
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
        
        // Enhanced particle system with mouse interaction
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.addEventListener('mouseenter', function() {
                this.style.animationDuration = '0.5s';
                this.style.transform = 'scale(2)';
                this.style.opacity = '1';
            });
            
            particle.addEventListener('mouseleave', function() {
                this.style.animationDuration = (Math.random() * 10 + 10) + 's';
                this.style.transform = 'scale(1)';
                this.style.opacity = '0.3';
            });
        });
    }

    // Counter Animation for Stats
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

    // Typing Effect for Hero Title (optional enhancement)
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

    // Magnetic Button Effect (Desktop only)
    if (window.innerWidth > 768) {
        const magneticButtons = document.querySelectorAll('.magnetic-button');
        magneticButtons.forEach(button => {
            button.addEventListener('mousemove', function(e) {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const strength = 0.3;
                button.style.transform = `translate(${x * strength}px, ${y * strength}px) scale(1.05)`;
            });
            
            button.addEventListener('mouseleave', function() {
                button.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }

    // Enhanced particle system with mouse interaction (using existing particlesContainer)
    if (particlesContainer) {
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.addEventListener('mouseenter', function() {
                this.style.animationDuration = '0.5s';
                this.style.transform = 'scale(2)';
                this.style.opacity = '1';
            });
            
            particle.addEventListener('mouseleave', function() {
                this.style.animationDuration = (Math.random() * 10 + 10) + 's';
                this.style.transform = 'scale(1)';
                this.style.opacity = '0.3';
            });
        });
    }

    // Add ripple effect on click
    document.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });

    // Add ripple effect on click
    document.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });

    // Enhanced counter animation with more visual effects
    function animateCounter(element, target, suffix = '') {
        let current = 0;
        const increment = target / 30;
        const duration = 1500;
        const stepTime = duration / 30;
        
        element.classList.add('counting');
        element.style.transform = 'scale(1.1)';
        element.style.transition = 'transform 0.3s ease';
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(counter);
                element.classList.remove('counting');
                element.style.transform = 'scale(1)';
                
                // Add celebration effect
                element.style.animation = 'countPulse 0.5s ease';
                setTimeout(() => {
                    element.style.animation = '';
                }, 500);
            }
            element.textContent = Math.floor(current) + suffix;
        }, stepTime);
    }

    // Theme Toggle Logic
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const themeIcon = document.querySelector('.theme-icon path');
    
    // Check saved preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Add animation
            themeToggle.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                themeToggle.style.transform = 'rotate(0)';
            }, 300);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        // Sun icon for light mode, Moon for dark
        if (theme === 'light') {
            themeIcon.setAttribute('d', 'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z');
        } else {
            themeIcon.setAttribute('d', 'M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z');
        }
    }

    // Cookie Banner Logic
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptBtn = document.getElementById('acceptCookies');
    const declineBtn = document.getElementById('declineCookies');

    if (cookieBanner && !localStorage.getItem('cookieConsent')) {
        setTimeout(() => {
            cookieBanner.classList.add('visible');
        }, 2000);
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieBanner.classList.remove('visible');
        });
    }

    if (declineBtn) {
        declineBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'declined');
            cookieBanner.classList.remove('visible');
        });
    }

    // Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const scrollProgress = document.getElementById('scrollProgress');
        if (scrollProgress) {
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        }
    });

    // Ambient Shapes Parallax
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.ambient-shape');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
});
