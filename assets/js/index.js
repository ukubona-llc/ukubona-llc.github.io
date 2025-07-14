const links = [
  { name: 'Home', url: 'index.html', icon: '📊' },
  { name: 'Mission', url: 'assets/html/mission.html', icon: '🎯' },
  { name: 'Models', url: 'assets/html/models.html', icon: '📈' },
  { name: 'Team', url: 'assets/html/team.html', icon: '👥' },
  { name: 'Contact', url: 'assets/html/contact.html', icon: '✉️' },
  { name: 'Education', url: 'assets/html/pairs-jh.html', icon: '📚' },
];

const modalData = { /* Unchanged, full modalData from previous response */ };

function loadHTML(elementId, url) {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${url}`);
      return response.text();
    })
    .then(data => {
      document.getElementById(elementId).innerHTML = data;
      if (elementId === 'header') {
        console.log('Populating app-grid with links');
        const gridMenu = document.getElementById('gridMenu');
        if (gridMenu) {
          gridMenu.innerHTML = links
            .map(link => `
              <a href="${link.url}">
                <div class="icon-box">${link.icon}</div>
                ${link.name}
              </a>
            `)
            .join('');
          console.log('Grid content:', gridMenu.innerHTML);
        } else {
          console.error('gridMenu not found');
        }
      }
      if (elementId === 'services-section' || elementId === 'metrics-section') {
        document.querySelectorAll('[data-modal]').forEach(element => {
          element.removeEventListener('click', modalClickHandler);
          element.addEventListener('click', modalClickHandler);
        });
      }
    })
    .catch(error => console.error(`Error loading ${url}:`, error));
}

function modalClickHandler() {
  const modalId = this.getAttribute('data-modal');
  openModal(modalId);
}

function openModal(modalId) {
  const data = modalData[modalId];
  if (!data) {
    console.error(`No modal data for ${modalId}`);
    return;
  }
  const modalIcon = document.getElementById('modalIcon');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  if (!modalIcon || !modalTitle || !modalBody) {
    console.error('Modal elements not found');
    return;
  }
  modalIcon.textContent = data.icon;
  modalTitle.textContent = data.title;
  modalBody.innerHTML = '';
  data.sections.forEach(section => {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'modal-section';
    const sectionTitle = document.createElement('h3');
    sectionTitle.textContent = section.title;
    sectionDiv.appendChild(sectionTitle);
    const sectionContent = document.createElement('p');
    sectionContent.textContent = section.content;
    sectionDiv.appendChild(sectionContent);
    if (section.subsections) {
      section.subsections.forEach(subsection => {
        const subsectionDiv = document.createElement('div');
        subsectionDiv.className = 'modal-subsection';
        const subsectionTitle = document.createElement('h4');
        subsectionTitle.textContent = subsection.title;
        subsectionDiv.appendChild(subsectionTitle);
        const subsectionContent = document.createElement('p');
        subsectionContent.textContent = subsection.content;
        subsectionDiv.appendChild(subsectionContent);
        sectionDiv.appendChild(subsectionDiv);
      });
    }
    modalBody.appendChild(sectionDiv);
  });
  const modalOverlay = document.getElementById('modalOverlay');
  if (modalOverlay) {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    console.error('modalOverlay not found');
  }
}

function closeModal() {
  const modalOverlay = document.getElementById('modalOverlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  } else {
    console.error('modalOverlay not found');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadHTML('header', 'assets/html/header.html');
  loadHTML('hero', 'assets/html/hero.html');
  loadHTML('services-section', 'assets/html/services-section.html');
  loadHTML('metrics-section', 'assets/html/metrics-section.html');
  loadHTML('modal-overlay', 'assets/html/modal-overlay.html');
  loadHTML('footer-placeholder', 'assets/html/footer.html');

  document.body.classList.add('loaded');

  document.getElementById('modalOverlay')?.addEventListener('click', function(e) {
    if (e.target === this) {
      closeModal();
    }
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // Debug Education link clicks
  document.addEventListener('click', (e) => {
    if (e.target.closest('.nav-link') || e.target.closest('.app-grid a')) {
      console.log('Link clicked:', e.target.closest('a').href);
    }
  });
});