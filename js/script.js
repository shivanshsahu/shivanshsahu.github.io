document.addEventListener('DOMContentLoaded', () => {
    // ===== Animated stat counters =====
    function animateCounters() {
        document.querySelectorAll('.stat-number[data-count]').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'), 10);
            const duration = 1500;
            const step = target / (duration / 16);
            let current = 0;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 16);
        });
    }

    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        statsObserver.observe(statsBar);
    }

    // ===== Scroll-triggered reveal =====
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.classList.add('reveal');
        revealObserver.observe(aboutSection);
    }

    // ===== Navbar scroll effect =====
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.style.background = 'rgba(11, 14, 20, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.background = 'rgba(21, 26, 35, 0.7)';
            navbar.style.boxShadow = 'none';
        }
    });

    // ===== Active nav state on scroll =====
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .mobile-nav a[href^="#"]');
    const sectionIds = ['about', 'methodology', 'case-studies', 'testimonials', 'operations'];
    const sectionElements = sectionIds
        .map(id => document.getElementById(id))
        .filter(Boolean);

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sectionElements.forEach(sec => navObserver.observe(sec));

    // ===== Mobile menu toggle =====
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    if (mobileBtn && mobileNav) {
        mobileBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
        });
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => mobileNav.classList.remove('open'));
        });
    }

    // ===== Smooth scroll for anchor links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.length < 2) return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
