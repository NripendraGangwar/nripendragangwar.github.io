/**
 * Nripendra Gangwar - Interactive CV Script (Dark Theme Version)
 *
 * This script handles:
 * 1. Mobile navigation menu toggle.
 * 2. Navbar hide/show behavior on scroll.
 * 3. Active link highlighting as the user scrolls.
 * 4. "Animate on scroll" for skill progress bars and dashboard chart.
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

        // Hide navbar on scroll down, show on scroll up
        if (navbar) {
            if (scrollY > lastScrollY && scrollY > 150) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScrollY = scrollY;
        }

        // Highlight active navigation link
        let currentSectionId = '';
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150; // Adjusted offset for better accuracy
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                currentSectionId = current.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            // Check if the link's href attribute contains the current section ID
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active-link');
            }
        });
    };

    window.addEventListener('scroll', scrollHandler);
    scrollHandler(); // Run on load to set initial state

    // --- 4. Animate Progress Bars on Scroll ---
    // This observer triggers the animation for skill bars and chart bars when they enter the viewport.
    const barObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // The final value is read from the inline style in the HTML
                const finalValue = element.style.width || element.style.height;

                // We override the initial CSS animation by directly setting the transition property
                // and then the final value.
                if (element.classList.contains('skill-progress')) {
                    element.style.width = finalValue;
                } else if (element.classList.contains('bar')) {
                    element.style.height = finalValue;
                }
                
                // Stop observing once the animation has been triggered
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the bar is visible
    });

    // Prepare skill bars for observation
    document.querySelectorAll('.skill-progress').forEach(bar => {
        const finalWidth = bar.style.width;
        bar.style.width = '0%'; // Set initial state to 0 for animation
        bar.style.transition = 'width 2s ease-out'; // Add transition via JS
        barObserver.observe(bar);
        bar.style.width = finalWidth; // Re-apply final width to use as the target
    });

    // Prepare chart bars for observation
    document.querySelectorAll('.dashboard-chart .bar').forEach(bar => {
        const finalHeight = bar.style.height;
        bar.style.height = '0%'; // Set initial state to 0 for animation
        bar.style.transition = 'height 2s ease-out'; // Add transition via JS
        barObserver.observe(bar);
        bar.style.height = finalHeight; // Re-apply final height to use as the target
    });

    // A small fix to re-trigger the animation when observing
    const reobserveBars = (selector) => {
        document.querySelectorAll(selector).forEach(bar => {
            barObserver.observe(bar);
        });
    };

    // Initial observation
    reobserveBars('.skill-progress');
    reobserveBars('.dashboard-chart .bar');

});
