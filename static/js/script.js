/**
 * Nripendra Gangwar - Interactive CV Script
 *
 * This script handles:
 * 1. Mobile navigation menu toggle.
 * 2. Navbar behavior on scroll (hide/show and style change).
 * 3. Active link highlighting as the user scrolls through sections.
 * 4. "Animate on scroll" effects for various elements using Intersection Observer.
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Navigation ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // The 'active' class on the toggle can be used to animate the bars into an 'X'
            // Example CSS for the 'X' animation (add to your stylesheet):
            /*
            .nav-toggle.active .bar:nth-child(1) { transform: rotate(45deg) translate(6px, 6px); }
            .nav-toggle.active .bar:nth-child(2) { opacity: 0; }
            .nav-toggle.active .bar:nth-child(3) { transform: rotate(-45deg) translate(6px, -6px); }
            */
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

        // Add 'scrolled' class to navbar after scrolling down
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
                // The 'scrolled' class can add a darker background for better visibility.
                // Example CSS (add to your stylesheet):
                /*
                .navbar.scrolled {
                    background: rgba(26, 26, 46, 0.7);
                    box-shadow: var(--shadow-light);
                }
                */
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Hide navbar on scroll down, show on scroll up
        if (scrollY > lastScrollY && scrollY > 150) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollY = scrollY;


        // Highlight active navigation link
        let currentSectionId = '';
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                currentSectionId = current.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active-link');
                // The 'active-link' class can mimic the hover state.
                // Example CSS (add to your stylesheet):
                /*
                .nav-link.active-link::after { width: 80%; }
                */
            }
        });
    };

    window.addEventListener('scroll', scrollHandler);
    scrollHandler(); // Run on load to set initial state


    // --- 4. Animate on Scroll using Intersection Observer ---

    // General observer for fade-in and slide-up effects
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -50px 0px' // Trigger a bit before it's fully in view
    });

    const elementsToAnimate = document.querySelectorAll(
        '.section-header, .about-content > div, .timeline-item, .skill-category, .award-card, .contact-content > div'
    );

    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');
        animationObserver.observe(el);
    });

    // Specific observer for progress bars and charts
    const barObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('in-view'); // Trigger CSS animation
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the bar is visible
    });

    // Prepare skill bars and chart bars to trigger animation via class
    document.querySelectorAll('.skill-progress, .dashboard-chart .bar').forEach(bar => {
        barObserver.observe(bar);
    });

});
/**
 * Nripendra Gangwar - Interactive CV Script
 *
 * This script handles:
 * 1. Mobile navigation menu toggle.
 * 2. Navbar behavior on scroll (hide/show and style change).
 * 3. Active link highlighting as the user scrolls through sections.
 * 4. "Animate on scroll" effects for various elements using Intersection Observer.
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Navigation ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // The 'active' class on the toggle can be used to animate the bars into an 'X'
            // Example CSS for the 'X' animation (add to your stylesheet):
            /*
            .nav-toggle.active .bar:nth-child(1) { transform: rotate(45deg) translate(6px, 6px); }
            .nav-toggle.active .bar:nth-child(2) { opacity: 0; }
            .nav-toggle.active .bar:nth-child(3) { transform: rotate(-45deg) translate(6px, -6px); }
            */
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

        // Add 'scrolled' class to navbar after scrolling down
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
                // The 'scrolled' class can add a darker background for better visibility.
                // Example CSS (add to your stylesheet):
                /*
                .navbar.scrolled {
                    background: rgba(26, 26, 46, 0.7);
                    box-shadow: var(--shadow-light);
                }
                */
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Hide navbar on scroll down, show on scroll up
        if (scrollY > lastScrollY && scrollY > 150) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollY = scrollY;


        // Highlight active navigation link
        let currentSectionId = '';
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                currentSectionId = current.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active-link');
                // The 'active-link' class can mimic the hover state.
                // Example CSS (add to your stylesheet):
                /*
                .nav-link.active-link::after { width: 80%; }
                */
            }
        });
    };

    window.addEventListener('scroll', scrollHandler);
    scrollHandler(); // Run on load to set initial state


    // --- 4. Animate on Scroll using Intersection Observer ---

    // General observer for fade-in and slide-up effects
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -50px 0px' // Trigger a bit before it's fully in view
    });

    const elementsToAnimate = document.querySelectorAll(
        '.section-header, .about-content > div, .timeline-item, .skill-category, .award-card, .contact-content > div'
    );

    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');
        animationObserver.observe(el);
    });

    // Specific observer for progress bars and charts
    const barObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('in-view'); // Trigger CSS animation
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the bar is visible
    });

    // Prepare skill bars and chart bars to trigger animation via class
    document.querySelectorAll('.skill-progress, .dashboard-chart .bar').forEach(bar => {
        barObserver.observe(bar);
    });

});
