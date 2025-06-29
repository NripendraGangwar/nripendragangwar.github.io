/**
 * Nripendra Gangwar - Interactive CV Script (Dark Theme Version - Corrected)
 *
 * This script handles:
 * 1. Mobile navigation menu toggle.
 * 2. Navbar hide/show behavior on scroll.
 * 3. Active link highlighting as the user scrolls.
 * 4. "Animate on scroll" for the timeline.
 * 5. "Animate on scroll" for skill progress bars and dashboard chart.
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Navigation ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // --- 2. Navbar Scroll Behavior & 3. Active Link Highlighting ---
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section[id]');
    let lastScrollY = window.scrollY;

    const scrollHandler = () => {
        const scrollY = window.pageYOffset;

        if (navbar) {
            if (scrollY > lastScrollY && scrollY > 150) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScrollY = scrollY;
        }

        let currentSectionId = '';
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150;
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                currentSectionId = current.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active-link');
            }
        });
    };

    window.addEventListener('scroll', scrollHandler);
    scrollHandler();

    // --- 4. Animate Timeline on Scroll ---
    const timelineObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -100px 0px' // Trigger animation slightly before it's fully in view
    });

    document.querySelectorAll('.timeline-item').forEach(item => {
        timelineObserver.observe(item);
    });

    // --- 5. Animate Progress Bars on Scroll ---
    const barObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalValue = element.getAttribute('data-final-value');

                if (element.classList.contains('skill-progress')) {
                    element.style.width = finalValue;
                } else if (element.classList.contains('bar')) {
                    element.style.height = finalValue;
                }
                
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.5
    });

    // Prepare skill bars
    document.querySelectorAll('.skill-progress').forEach(bar => {
        const finalWidth = bar.style.width;
        bar.setAttribute('data-final-value', finalWidth);
        bar.style.width = '0%';
        barObserver.observe(bar);
    });

    // Prepare chart bars
    document.querySelectorAll('.dashboard-chart .bar').forEach(bar => {
        const finalHeight = bar.style.height;
        bar.setAttribute('data-final-value', finalHeight);
        bar.style.height = '0%';
        barObserver.observe(bar);
    });
});
