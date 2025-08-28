// assets/js/shared.js
document.addEventListener('DOMContentLoaded', async () => {
  const html = document.documentElement;

  // ---------- 1) Inject header & footer ----------
  async function inject(id, url) {
    const host = document.getElementById(id);
    if (!host) return null;
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      host.innerHTML = await res.text();
      return host;
    } catch (e) {
      console.error(`Failed to load ${url}`, e);
      return null;
    }
  }

  // Load header and footer before wiring events
  await inject('header', '/assets/html/header.html');
  await inject('footer-placeholder', '/assets/html/footer.html');

  // ---------- 2) Grab elements now that header is in the DOM ----------
  const toggleBtn = document.getElementById('toggle-theme');
  const logo      = document.getElementById('logo');
  const menu      = document.getElementById('gridMenu');
  const menuIcon  = document.getElementById('menuIcon');

  const LIGHT_LOGO = 'https://abikesa.github.io/logos/assets/ukubona-light.png';
  const DARK_LOGO  = 'https://abikesa.github.io/logos/assets/ukubona-dark.png';

  // ---------- 3) Theme persistence + logo swap ----------
  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch {}
    if (logo)  logo.src = (theme === 'dark') ? DARK_LOGO : LIGHT_LOGO;
    if (toggleBtn) toggleBtn.textContent = (theme === 'dark') ? '🌙' : '🌞';
  }

  const saved = (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) || 'dark';
  setTheme(saved);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(next);
      // console.log('Theme toggled to:', next);
    });
  }

  // ---------- 4) Active nav state ----------
  (function markActiveNav() {
    const path = location.pathname.replace(/\/+$/, '');
    const file = path.split('/').pop() || 'index.html';
    const map = {
      'index.html':     'home',
      'mission.html':   'mission',
      'models.html':    'models',
      'team.html':      'team',
      'contact.html':   'contact',
      'pairs-jh.html':  'education',
      'card.html':      'card',
      'pitch.html':     'pitch',
      'game.html':      'game'
    };
    const key = map[file] || null;
    if (!key) return;

    document.querySelectorAll(`a.nav-link[data-nav="${key}"]`).forEach(a => a.classList.add('active'));
    // If your header.html doesn't have data-nav attributes on links, you can alternatively match by href:
    // document.querySelectorAll('.nav-links a').forEach(a => {
    //   if (a.getAttribute('href')?.endsWith(file)) a.classList.add('active');
    // });
  })();

  // ---------- 5) App-grid open/close ----------
  if (menuIcon && menu) {
    const openGrid = () => {
      menu.classList.add('active');
      menu.setAttribute('aria-hidden', 'false');
    };
    const closeGrid = () => {
      menu.classList.remove('active');
      menu.setAttribute('aria-hidden', 'true');
    };

    menuIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      if (menu.classList.contains('active')) closeGrid(); else openGrid();
      // console.log('Grid toggle clicked, active:', menu.classList.contains('active'));
    });

    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !menuIcon.contains(e.target)) closeGrid();
    });
  } else {
    // console.warn('menuIcon or gridMenu not found');
  }

  // ---------- 6) Feather icons refresh ----------
  if (window.feather) feather.replace();

  // ---------- 7) Scroll progress bar (if present) ----------
  (function wireScrollBar() {
    const progress = document.querySelector('.scroll-progress');
    if (!progress) return;
    function onScroll() {
      const h = document.documentElement;
      const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      progress.style.width = pct + '%';
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();
});
