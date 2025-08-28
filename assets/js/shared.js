document.addEventListener('DOMContentLoaded', async () => {
  const html = document.documentElement;

  // If hosted at https://<user>.github.io/ukubona-llc.github.io/, set BASE automatically
  const REPO = '/ukubona-llc.github.io';
  const BASE = location.pathname.startsWith(REPO) ? REPO : '';

  // Helper to inject HTML
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

  // Cache-bust version (bump when header/footer change)
  const V = 'v20250828';

  // Inject header & footer
  await inject('header', `${BASE}/assets/html/header.html?${V}`);
  await inject('footer-placeholder', `${BASE}/assets/html/footer.html?${V}`);

  // Rewrite links in injected header to include BASE for project sites
  document.querySelectorAll('.nav-links a, #gridMenu a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    if (href === '/') { a.setAttribute('href', `${BASE}/`); return; }
    if (href.startsWith('/')) a.setAttribute('href', `${BASE}${href}`);
  });

  // Elements now in DOM
  const toggleBtn = document.getElementById('toggle-theme');
  const logo      = document.getElementById('logo');
  const menu      = document.getElementById('gridMenu');
  const menuIcon  = document.getElementById('menuIcon');

  const LIGHT_LOGO = 'https://abikesa.github.io/logos/assets/ukubona-light.png';
  const DARK_LOGO  = 'https://abikesa.github.io/logos/assets/ukubona-dark.png';

  // Theme persistence + logo
  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch {}
    if (logo)      logo.src = (theme === 'dark') ? DARK_LOGO : LIGHT_LOGO;
    if (toggleBtn) toggleBtn.textContent = (theme === 'dark') ? '🌙' : '🌞';
  }
  setTheme((() => { try { return localStorage.getItem('theme') || 'dark'; } catch { return 'dark'; } })());
  if (toggleBtn) toggleBtn.addEventListener('click', () => {
    setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  // Active nav
  (function markActive() {
    let path = location.pathname.replace(/\/+$/, '');
    if (BASE && path.startsWith(BASE)) path = path.slice(BASE.length) || '/';
    const file = path === '/' ? 'index.html' : path.split('/').pop();
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
    const key = map[file];
    if (!key) return;
    document.querySelectorAll(`a.nav-link[data-nav="${key}"]`).forEach(a => a.classList.add('active'));
  })();

  // App-grid toggle
  if (menuIcon && menu) {
    const open  = () => { menu.classList.add('active');  menu.setAttribute('aria-hidden','false'); };
    const close = () => { menu.classList.remove('active'); menu.setAttribute('aria-hidden','true'); };
    menuIcon.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.contains('active') ? close() : open(); });
    document.addEventListener('click', (e) => { if (!menu.contains(e.target) && !menuIcon.contains(e.target)) close(); });
  }

  // Feather icons
  if (window.feather) feather.replace();

  // Scroll progress (if present)
  (function wireScroll() {
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;
    const onScroll = () => {
      const d = document.documentElement;
      const pct = (d.scrollTop) / (d.scrollHeight - d.clientHeight) * 100;
      bar.style.width = pct + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();
});
