/* Ukubona shared.js v4.0 (2026-02-10)
   - BASE handling for GitHub Pages project sites
   - Cache-busted partial injection (header/footer + optional sections)
   - Link rewrite inside injected header/grid to respect BASE
   - Theme persistence + logo swap (#toggle-theme / [data-theme-toggle] / #logo)
   - Header height -> CSS var (--header-h) for anchor offset
   - Active nav (file -> data-nav map) + path fallback
   - App grid toggle (#gridMenu / #menuIcon)
   - Smooth in-page anchors (offset-aware), scroll progress bar, Feather icons
   - Rotating footer chorus (60s cycle matching logo) - respects footer.html structure
   - Footer variants ONLY for pages with <meta name="ukb-variant"> (opt-in)
*/

document.addEventListener('DOMContentLoaded', async () => {
  'use strict';

  const doc = document, win = window, html = doc.documentElement;
  const $  = (s, r = doc) => r.querySelector(s);
  const $$ = (s, r = doc) => Array.from(r.querySelectorAll(s));

  // --- Repo base (project pages vs apex) ---
  const REPO = '/ukubona-llc.github.io';
  const BASE = location.pathname.startsWith(REPO) ? REPO : '';

  // --- Cache-bust version (bump when partials change) ---
  const V = 'v20260210.1';
  const withBase = (p) => {
    if (!p) return p;
    if (/^(https?:|mailto:|tel:|#)/i.test(p)) return p;
    return p.startsWith('/') ? `${BASE}${p}` : p;
  };
  const withV = (url) => url + (url.includes('?') ? '&' : '?') + V;

  // --- Partial injection (header/footer required; others optional) ---
  const PARTIALS = [
    ['header',            '/assets/html/header.html'],
    ['hero',              '/assets/html/hero.html'],
    ['services-section',  '/assets/html/services-section.html'],
    ['metrics-section',   '/assets/html/metrics-section.html'],
    ['modal-overlay',     '/assets/html/modal-overlay.html'],
    ['footer-placeholder','/assets/html/footer.html'],
  ];

  async function inject(id, path){
    const host = doc.getElementById(id);
    if (!host) return null;
    const url = withV(withBase(path));
    try{
      const res = await fetch(url, { cache: 'no-cache' });
      if(!res.ok) throw new Error(res.status + ' ' + res.statusText);
      host.innerHTML = await res.text();
      return host;
    }catch(e){
      console.error('Failed to load', url, e);
      return null;
    }
  }

  await Promise.all(PARTIALS.map(([id, path]) => inject(id, path)));
  const headerHost = $('#header');
  const footerHost = $('#footer-placeholder');

  // --- Rewrite absolute links inside injected header/grid to respect BASE ---
  function rewriteLinks(root){
    if(!root) return;
    root.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (!href) return;
      if (href === '/') { a.setAttribute('href', `${BASE}/`); return; }
      if (href.startsWith('/')) a.setAttribute('href', `${BASE}${href}`);
    });
  }
  rewriteLinks(headerHost);
  rewriteLinks($('#gridMenu'));

  // --- Theme persistence + logo swap ---
  const LIGHT_LOGO = 'https://abikesa.github.io/logos/assets/ukubona-light.png';
  const DARK_LOGO  = 'https://abikesa.github.io/logos/assets/ukubona-dark.png';
  const logo      = $('#logo');
  const toggleBtn = $('#toggle-theme') || $('[data-theme-toggle]');

  function setTheme(theme){
    html.setAttribute('data-theme', theme);
    try{ localStorage.setItem('theme', theme); }catch(_){}
    if (logo)      logo.src = (theme === 'dark') ? DARK_LOGO : LIGHT_LOGO;
    if (toggleBtn) toggleBtn.textContent = (theme === 'dark') ? '🌙' : '🌞';
  }
  setTheme((() => { try { return localStorage.getItem('theme') || 'dark'; } catch { return 'dark'; } })());
  if (toggleBtn){
    toggleBtn.addEventListener('click', () => {
      setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  // --- Header height -> CSS var for perfect anchor offset ---
  function setHeaderVar(){
    const h = headerHost ? headerHost.offsetHeight : 64;
    html.style.setProperty('--header-h', (h || 64) + 'px');
  }
  setHeaderVar();
  win.addEventListener('resize', setHeaderVar, { passive: true });

  // --- Active nav: file -> data-nav map with path fallback ---
  (function markActive(){
    let path = location.pathname.replace(/\/+$/, '');
    if (BASE && path.startsWith(BASE)) path = path.slice(BASE.length) || '/';
    const file = (path === '/' ? 'index.html' : path.split('/').pop());
    const map = {
      'index.html':'home', 'mission.html':'mission', 'models.html':'models',
      'team.html':'team',  'contact.html':'contact', 'pairs-jh.html':'education',
      'card.html':'card',  'pitch.html':'pitch',     'game.html':'game'
    };
    const key = map[file];
    if (key) $$('.nav-links a.nav-link[data-nav="'+key+'"]').forEach(a => a.classList.add('active'));

    if (!key && headerHost){
      headerHost.querySelectorAll('a[href]').forEach(a=>{
        try{
          const abs = new URL(a.getAttribute('href'), location.origin).pathname
            .replace(new RegExp('^'+REPO), '') || '/';
          if ((path || '/') === abs) a.classList.add('active');
        }catch(_){}
      });
    }
  })();

  // --- App-grid toggle ---
  (function wireGridMenu(){
    const menu = $('#gridMenu');
    const btn  = $('#menuIcon');
    if(!(menu && btn)) return;
    const open  = () => { menu.classList.add('active');  menu.setAttribute('aria-hidden','false');  btn.setAttribute('aria-expanded','true'); };
    const close = () => { menu.classList.remove('active'); menu.setAttribute('aria-hidden','true'); btn.setAttribute('aria-expanded','false'); };
    btn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.contains('active') ? close() : open(); });
    doc.addEventListener('click', (e) => { if (!menu.contains(e.target) && !btn.contains(e.target)) close(); });
    doc.addEventListener('keydown', (e) => { if(e.key==='Escape') close(); });
    menu.addEventListener('click', (e) => { const a = e.target.closest('a[href]'); if(a) close(); });
  })();

  // --- Optional mobile nav hooks ---
  (function wireDataNav(){
    const toggle = headerHost ? headerHost.querySelector('[data-nav-toggle]') : null;
    const nav    = headerHost ? headerHost.querySelector('[data-nav]') : null;
    if(!(toggle && nav)) return;
    const setOpen = (v) => {
      nav.setAttribute('data-open', String(v));
      html.classList.toggle('nav-open', v);
      toggle.setAttribute('aria-expanded', String(v));
    };
    toggle.addEventListener('click', () => setOpen(nav.getAttribute('data-open') !== 'true'));
    nav.addEventListener('click', (e)=>{ const a = e.target.closest('a[href]'); if(a) setOpen(false); });
    doc.addEventListener('keydown', (e) => { if(e.key==='Escape') setOpen(false); });
  })();

  // --- Feather icons ---
  if (win.feather) win.feather.replace();

  // --- Scroll progress bar ---
  (function wireScrollProgress(){
    const bar = $('.scroll-progress');
    if (!bar) return;
    const onScroll = () => {
      const d = doc.documentElement;
      const max = d.scrollHeight - d.clientHeight;
      const pct = max > 0 ? (d.scrollTop / max) * 100 : 0;
      bar.style.width = pct + '%';
    };
    win.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();

  // --- Smooth in-page anchors ---
  (function wireSmoothAnchors(){
    doc.body.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if(!a) return;
      const hash = a.getAttribute('href');
      if(!hash || hash === '#') return;
      const target = $(hash);
      if(!target) return;
      e.preventDefault();
      const headerH = parseInt(getComputedStyle(html).getPropertyValue('--header-h')) || 64;
      const y = target.getBoundingClientRect().top + win.scrollY - headerH - 12;
      win.scrollTo({ top: y, behavior: 'smooth' });
      history.pushState(null, '', hash);
    });
    if (location.hash){
      setTimeout(() => {
        const target = $(location.hash);
        if (!target) return;
        const headerH = parseInt(getComputedStyle(html).getPropertyValue('--header-h')) || 64;
        const y = target.getBoundingClientRect().top + win.scrollY - headerH - 12;
        win.scrollTo({ top: y, behavior: 'instant' });
      }, 0);
    }
  })();

  // --- Tooltips bootstrap ---
  (function wireTooltips(){
    const api = win.ukbTooltips || win.UKBTooltips;
    if (api && typeof api.init === 'function'){
      try{ api.init(); }catch(e){ console.warn('tooltips init failed', e); }
    }
  })();

  // --- Rotating footer chorus (60s cycle) ---
  (function footerRotation(){
    function initRotation() {
      const chorus = $('.rotating-chorus');
      console.log('Looking for .rotating-chorus:', chorus);
      if (!chorus) return false;
      
      const chips = Array.from(chorus.querySelectorAll('.chip'));
      console.log('Found chips:', chips.length, chips);
      if (chips.length <= 1) return false;
      
      // Hide all except first
      chips.forEach((chip, i) => {
        chip.style.display = i === 0 ? 'inline' : 'none';
        console.log('Chip', i, 'display:', chip.style.display, chip.textContent);
      });
      
      let idx = 0;
      setInterval(() => {
        chips[idx].style.display = 'none';
        idx = (idx + 1) % chips.length;
        chips[idx].style.display = 'inline';
        console.log('🔄 Rotated to chip', idx, ':', chips[idx].textContent);
      }, 3000); // 3 seconds for TESTING - change back to 60000 for production
      
      console.log('✅ Footer rotation initialized!');
      return true;
    }
    
    // Try immediately
    if (initRotation()) return;
    
    console.log('⏳ Waiting for footer to load...');
    // If footer not ready, wait for it
    const observer = new MutationObserver(() => {
      if (initRotation()) observer.disconnect();
    });
    observer.observe(doc.body, { childList: true, subtree: true });
    
    // Safety: stop observing after 2 seconds
    setTimeout(() => {
      observer.disconnect();
      console.log('⚠️ Footer rotation observer timed out');
    }, 2000);
  })();

  // --- Footer variants (OPT-IN ONLY via meta tag) ---
  (function footerVariants(){
    const metaVariant = doc.querySelector('meta[name="ukb-variant"]');
    if (!metaVariant) return; // No meta tag = no variant override

    const footer = $('.footer');
    if(!footer) return;

    const variants = {
      game: [
        'Healthcare needs its flight simulator. ',
        'Ukubona builds it —',
        'digital twins for safer, ',
        'smarter decisions.'
      ],
      education: [
        'Practice over posturing.',
        'Reproducible over rhetorical.',
        'Iterate, don\'t imitate.',
        'Open tools, shared insight.'
      ],
      research: [
        'IRB before interface.',
        'Protocols before product.',
        'Validation before velocity.',
        'Stewardship always.'
      ],
      investor: [
        'Durability over drama.',
        'Governed growth.',
        'Moats from merit.',
        'Real problems, real margins.'
      ]
    };

    const variant = metaVariant.content.toLowerCase();
    const lines = variants[variant];
    if (!lines) return;

    // Only override if NOT a rotating-chorus (preserves footer.html)
    const bar = footer.querySelector('.footer-chorus:not(.rotating-chorus)');
    if (bar) bar.innerHTML = lines.map(l => `<span class="chip">${l}</span>`).join('');

    // Optional variant extras
    const extra = footer.querySelector('.footer-extra');
    let htmlExtra = '';
    if (extra){
      if (variant === 'game') {
        const tgt = withBase('/assets/html/game.html#scenarios');
        htmlExtra = `<nav class="footer-avatars" aria-label="Avatars">
          <a class="avatar-chip" href="${tgt}">👩‍⚕️ Doctor</a>
          <a class="avatar-chip" href="${tgt}">🧑‍🦽 Patient</a>
          <a class="avatar-chip" href="${tgt}">🏢 Insurer</a>
          <a class="avatar-chip" href="${tgt}">📚 Student</a>
          <a class="avatar-chip" href="${tgt}">🚑 Responder</a>
          <a class="avatar-chip" href="${tgt}">🧑‍⚕️ Nurse</a>
        </nav>`;
      } else if (variant === 'education') {
        htmlExtra = `<p class="footer-note">We teach analytics that travel: Stata · R · Python · SQL · Reproducible reports.</p>`;
      } else if (variant === 'research') {
        htmlExtra = `<p class="footer-note">Supporting PIs: study design, compliant pipelines, IRB-friendly workflows.</p>`;
      } else if (variant === 'investor') {
        htmlExtra = `<p class="footer-note">Operator's cadence: disciplined build, verifiable outcomes, scalable margins.</p>`;
      }
      if (htmlExtra) { extra.innerHTML = htmlExtra; extra.hidden = false; }
      else { extra.innerHTML = ''; extra.hidden = true; }
    }

    // Optional per-page footnote
    const footMeta = doc.querySelector('meta[name="ukb-footnote"]');
    if (footMeta){
      const note = footMeta.content.trim();
      const slot = footer.querySelector('.footer-footnote');
      if (slot && note) slot.innerHTML = `<p>${note}</p>`;
    }
  })();
});