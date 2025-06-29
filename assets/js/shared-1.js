// assets/js/shared.js
feather.replace();

const html = document.documentElement;
const toggleBtn = document.getElementById('toggle-theme');
const logo = document.getElementById('logo');
const LIGHT_LOGO = 'https://abikesa.github.io/logos/assets/ukubona-light.png';
const DARK_LOGO = 'https://abikesa.github.io/logos/assets/ukubona-dark.png';

function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    logo.src = theme === 'dark' ? DARK_LOGO : LIGHT_LOGO;
    toggleBtn.textContent = theme === 'dark' ? '🌙' : '🌞';
}

setTheme(localStorage.getItem('theme') || 'dark');

toggleBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});

const menu = document.getElementById('gridMenu');
const menuIcon = document.getElementById('menuIcon');
menuIcon.addEventListener('click', () => {
    menu.classList.toggle('reveal');
});

document.querySelectorAll('.nav-link, .cta-button').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .metric-card, .team-card, .section-title, .section-text').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});