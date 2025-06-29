/**
 * Nripendra Gangwar - Dynamic Interactive CV Script
 *
 * This script handles:
 * 1. Mobile navigation menu toggle.
 * 2. Navbar hide/show behavior on scroll.
 * 3. Active link highlighting.
 * 4. Background "curtain slide" effect on section scroll.
 * 5. Content animations on reveal.
 * 6. Skill bar and chart animations.
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Navigation ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // --- 2. Navbar Scroll Behavior ---
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (navbar) {
            if (lastScrollY < window.scrollY && window.scrollY > 150) {
                navbar.style.top = '-80px';
            } else {
                navbar.style.top = '0';
            }
            lastScrollY = window.scrollY;
        }
    });

    // --- Main Intersection Observer for ALL animations ---
    const sections = document.querySelectorAll('section[id]');
    const bgSlides = document.querySelectorAll('.bg-slide');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const correspondingSlide = document.querySelector(`.bg-slide[data-section="${id}"]`);
            const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);

            if (entry.isIntersecting) {
                // Add 'in-view' to the section to trigger its children's animations
                entry.target.classList.add('in-view');

                // Activate background slide
                if (correspondingSlide) {
                    bgSlides.forEach(slide => slide.classList.remove('is-visible'));
                    correspondingSlide.classList.add('is-visible');
                }

                // Highlight nav link
                if (correspondingLink) {
                    navLinks.forEach(link => link.classList.remove('active-link'));
                    correspondingLink.classList.add('active-link');
                }
                
                // Animate progress bars if they are in the current section
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    bar.style.width = bar.getAttribute('data-width');
                });

            } else {
                // Optional: remove class when it scrolls out of view to re-trigger animation
                // entry.target.classList.remove('in-view');
            }
        });
    }, {
        rootMargin: '-40% 0px -40% 0px' // Triggers when the section is in the middle 20% of the screen
    });

    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Store original width of skill bars and set to 0
    document.querySelectorAll('.skill-progress').forEach(bar => {
        bar.setAttribute('data-width', bar.style.width);
        bar.style.width = '0%';
    });

    // Animate timeline items individually for a staggered effect
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if(entry.isIntersecting) {
                entry.target.style.transitionDelay = `${index * 150}ms`;
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    timelineItems.forEach(item => {
        item.classList.add('reveal-up'); // Add reveal class for animation
        timelineObserver.observe(item);
    });

});