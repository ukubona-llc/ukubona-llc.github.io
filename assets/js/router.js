document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('.main-content');
  const hero = document.querySelector('.hero');

  function loadPage(url) {
    fetch(url)
      .then(res => res.text())
      .then(html => {
        const temp = document.createElement('div');
        temp.innerHTML = html;

        const newHero = temp.querySelector('.hero');
        const newMain = temp.querySelector('.main-content');

        if (newHero) hero.replaceWith(newHero);
        if (newMain) main.replaceWith(newMain);

        history.pushState({}, '', url);

        if (window.feather) feather.replace();
      })
      .catch(console.error);
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.endsWith('.pdf')) return;
      e.preventDefault();
      loadPage(href);
    });
  });

  window.addEventListener('popstate', () => {
    loadPage(location.pathname);
  });
});
