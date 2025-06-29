// Scroll progress indicator
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / documentHeight) * 100;
    document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// Smooth scrolling for anchor links
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .metric-card, .section-title').forEach(el => {
    observer.observe(el);
});

// Add parallax effect to background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.bg-pattern::before');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover sound effects (optional)
function addHoverSounds() {
    const hoverElements = document.querySelectorAll('.service-card, .metric-card, .cta-button');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.transform += ' scale(1.02)';
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = el.style.transform.replace(' scale(1.02)', '');
        });
    });
}

// Initialize hover effects
addHoverSounds();

// Performance optimization: Debounce scroll events
let ticking = false;

function updateOnScroll() {
    updateScrollProgress();
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});
