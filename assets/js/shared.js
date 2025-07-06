// Theme toggle functionality
const html = document.documentElement;
const toggleBtn = document.getElementById('toggle-theme');
const logo = document.getElementById('logo');
const LIGHT_LOGO = 'https://abikesa.github.io/logos/assets/ukubona-light.png';
const DARK_LOGO = 'https://abikesa.github.io/logos/assets/ukubona-dark.png';

function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (logo) {
        logo.src = theme === 'dark' ? DARK_LOGO : LIGHT_LOGO;
    }
    toggleBtn.textContent = theme === 'dark' ? '🌙' : '🌞';
}

setTheme(localStorage.getItem('theme') || 'dark');

toggleBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});

// Grid menu toggle
const menu = document.getElementById('gridMenu');
const menuIcon = document.getElementById('menuIcon');

menuIcon.addEventListener('click', () => {
    menu.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!menuIcon.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('active');
    }
});