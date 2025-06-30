@@ -0,0 +1,181 @@
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

    // We need to add some base styles with JS for the animation to work,
    // as we cannot modify the original CSS file.
    const elementsToAnimate = document.querySelectorAll(
        '.section-header, .about-content > div, .timeline-item, .skill-category, .award-card, .contact-content > div'
    );

    elementsToAnimate.forEach(el => {
        // Create a style element to add the animation base styles
        const style = document.createElement('style');
        style.innerHTML = `
            .animate-on-scroll {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }
            .animate-on-scroll.in-view {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);

        el.classList.add('animate-on-scroll');
        animationObserver.observe(el);
    });

    // Specific observer for progress bars and charts
    // This is needed because their animation is tied to inline style values.
    const barObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalValue = element.getAttribute('data-value');

                // The CSS animation runs on page load. This JS overrides it
                // to trigger on scroll, using the 'transition' property instead.
                if (element.classList.contains('skill-progress')) {
                    element.style.width = finalValue;
                } else if (element.classList.contains('bar')) {
                    element.style.height = finalValue;
                }

                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the bar is visible
    });

    // Prepare skill bars
    document.querySelectorAll('.skill-progress').forEach(bar => {
        const finalWidth = bar.style.width;
        bar.setAttribute('data-value', finalWidth);
        bar.style.width = '0%'; // Set initial state
        barObserver.observe(bar);
    });

    // Prepare chart bars
    document.querySelectorAll('.dashboard-chart .bar').forEach(bar => {
        const finalHeight = bar.style.height;
        bar.setAttribute('data-value', finalHeight);Add commentMore actions
        bar.style.height = '0%'; // Set initial state
        barObserver.observe(bar);
    });

});
