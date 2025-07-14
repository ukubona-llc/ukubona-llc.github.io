document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const html = document.documentElement;
    const toggleBtn = document.getElementById('toggle-theme');
    const logo = document.getElementById('logo');
    const menu = document.getElementById('gridMenu');
    const menuIcon = document.getElementById('menuIcon');
    const LIGHT_LOGO = 'https://abikesa.github.io/logos/assets/ukubona-light.png';
    const DARK_LOGO = 'https://abikesa.github.io/logos/assets/ukubona-dark.png';

    // Track logo rotation
    const ANIMATION_DURATION = 60000; // 60s
    let startTime = performance.now();

    function getRotationProgress() {
      const elapsed = (performance.now() - startTime) % ANIMATION_DURATION;
      return elapsed / ANIMATION_DURATION; // 0 to 1
    }

    function setTheme(theme) {
      html.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);

      if (logo) {
        // Calculate progress and equivalent negative delay
        const progress = getRotationProgress();
        const currentAngle = progress * 360;
        const negativeDelay = -(progress * ANIMATION_DURATION) / 1000; // Seconds
        // Update src and animation
        logo.src = theme === 'dark' ? DARK_LOGO : LIGHT_LOGO;
        logo.style.animation = 'none';
        logo.offsetHeight; // Trigger reflow
        logo.style.animation = `spin ${ANIMATION_DURATION / 1000}s linear infinite`;
        logo.style.animationDelay = `${negativeDelay}s`;
        console.log('Theme toggled to:', theme, 'Angle:', currentAngle, 'Delay:', negativeDelay);
      }

      if (toggleBtn) {
        toggleBtn.textContent = theme === 'dark' ? '🌙' : '🌞';
      }
    }

    if (toggleBtn && logo) {
      setTheme(localStorage.getItem('theme') || 'dark');
      toggleBtn.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
      });
    }

    if (menuIcon && menu) {
      menuIcon.addEventListener('click', () => {
        menu.classList.toggle('active');
        console.log('Grid toggle:', menu.classList.contains('active'));
      });
      document.addEventListener('click', (e) => {
        if (!menuIcon.contains(e.target) && !menu.contains(e.target)) {
          menu.classList.remove('active');
          console.log('Grid closed');
        }
      });
    }
  }, 1000);
});