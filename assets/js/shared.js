document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const html = document.documentElement;
    const toggleBtn = document.getElementById('toggle-theme');
    const logo = document.getElementById('logo');
    const menu = document.getElementById('gridMenu');
    const menuIcon = document.getElementById('menuIcon');
    const LIGHT_LOGO = 'https://abikesa.github.io/logos/assets/ukubona-light.png';
    const DARK_LOGO = 'https://abikesa.github.io/logos/assets/ukubona-dark.png';

    function setTheme(theme) {
      html.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      if (logo) {
        logo.src = theme === 'dark' ? DARK_LOGO : LIGHT_LOGO;
      } else {
        console.error('Logo element not found');
      }
      if (toggleBtn) {
        toggleBtn.textContent = theme === 'dark' ? '🌙' : '🌞';
      } else {
        console.error('Toggle button not found');
      }
    }

    if (toggleBtn && logo) {
      setTheme(localStorage.getItem('theme') || 'dark');
      toggleBtn.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
        console.log('Theme toggled to:', html.getAttribute('data-theme'));
      });
    } else {
      console.error('toggle-theme or logo not found');
    }

    if (menuIcon && menu) {
      menuIcon.addEventListener('click', () => {
        menu.classList.toggle('active');
        console.log('Grid toggle clicked, active:', menu.classList.contains('active'));
        if (menu.classList.contains('active')) {
          console.log('Grid content:', menu.innerHTML);
        }
      });
      document.addEventListener('click', (e) => {
        if (!menuIcon.contains(e.target) && !menu.contains(e.target)) {
          menu.classList.remove('active');
          console.log('Grid closed via outside click');
        }
      });
    } else {
      console.error('menuIcon or gridMenu not found');
    }
  }, 1000); // Increased delay for fetch-loaded content
});