// Links array for app-grid (from original index.html)
const links = [
  { name: 'Home',        url: 'index.html',                icon: '📊' },
  { name: 'Mission',     url: 'assets/html/mission.html',  icon: '🎯' },
  { name: 'Models',      url: 'assets/html/models.html',   icon: '📈' },
  { name: 'Team',        url: 'assets/html/team.html',     icon: '👥' },
  { name: 'Contact',     url: 'assets/html/contact.html',  icon: '✉️' },
  { name: 'Education',   url: 'assets/html/pairs-jh.html', icon: '📚' },
  { name: 'Business Card', url: 'assets/html/card.html',   icon: '📇' },
  { name: 'Game of Care',  url: 'assets/html/game.html',   icon: '🎮' },
];

// Modal data (full original content)
const modalData = {
  'service-1': {
    icon: '🌊',
    title: 'Signal Nutrition',
    sections: [
      {
        title: 'Overview',
        content: 'We build real-time signal pipelines designed to prioritize contextual relevance — supporting precise clinical decisions in dynamic environments.',
        subsections: [
          { title: 'Core Technology', content: 'Streaming data systems trained to detect clinically actionable signals across heterogeneous data sources.' },
          { title: 'Applications', content: 'Personalized monitoring for chronic conditions, acute event triage, and real-time risk stratification.' }
        ]
      },
      {
        title: 'Technical Framework',
        content: 'Our systems utilize edge-aware analytics and modular event processors tailored for health environments.',
        subsections: [
          { title: 'Pipeline Architecture', content: 'Kafka-based messaging systems and distributed inference engines supporting low-latency workflows.' },
          { title: 'Adaptive Filtering', content: 'Context-aware algorithms fine-tuned for patient state, clinician input, and evolving population trends.' }
        ]
      }
    ]
  },
  'service-2': {
    icon: '❤️',
    title: 'Interface Ingestion',
    sections: [
      {
        title: 'Overview',
        content: 'Our interfaces are designed for human use in clinical complexity — readable, interoperable, and responsive to real-world constraints.',
        subsections: [
          { title: 'Design Process', content: 'UX designed in close collaboration with patients, clinicians, and administrators to prioritize clarity, speed, and safety.' },
          { title: 'Interface Modalities', content: 'Dashboards, voice assistants, mobile apps, and embedded EHR components.' }
        ]
      },
      {
        title: 'Implementation Standards',
        content: 'Each tool integrates with existing systems to reduce overhead and preserve continuity of care.',
        subsections: [
          { title: 'Stack + Compliance', content: 'React + Node.js front-end, HL7/FHIR APIs, and HIPAA/NIST-aligned security protocols.' },
          { title: 'EHR Compatibility', content: 'SMART-on-FHIR integration for Epic, Cerner, and other major platforms.' }
        ]
      }
    ]
  },
  'service-3': {
    icon: '🔁',
    title: 'Recursion Logic',
    sections: [
      {
        title: 'Overview',
        content: 'We develop symbolic and recursive reasoning systems for high-stakes health decisions — built for interpretability, modularity, and performance.',
        subsections: [
          { title: 'Symbolic Logic', content: 'Ontologies, causal graphs, and rule-based logic engines that support traceable decision flows.' },
          { title: 'Temporal Reasoning', content: 'Recursive mechanisms that integrate past decisions, current state, and future trajectories.' }
        ]
      },
      {
        title: 'System Design',
        content: 'Our architecture is modular, interpretable, and designed for iterative learning.',
        subsections: [
          { title: 'Knowledge Layers', content: 'Multi-tier graph structures and inference rules enabling domain-specific reasoning.' },
          { title: 'Learning Feedback Loops', content: 'State-aware systems that refine outputs based on user feedback and outcome tracking.' }
        ]
      }
    ]
  },
  'service-4': {
    icon: '🎭',
    title: 'Mask + Meaning',
    sections: [
      {
        title: 'Overview',
        content: 'Agent-based simulation environments for modeling behavior, values, and policy impacts — aligning ethical considerations with real-world complexity.',
        subsections: [
          { title: 'Agent Modeling', content: 'Heterogeneous agents simulating patients, clinicians, and organizations under constraint.' },
          { title: 'Values & Intentions', content: 'Simulation parameters include norms, goals, and ethical commitments.' }
        ]
      },
      {
        title: 'Simulation Platforms',
        content: 'Robust infrastructure for exploratory modeling, intervention testing, and behavioral inference.',
        subsections: [
          { title: 'Engines + Tools', content: 'Custom Python engines and AnyLogic for multi-agent, value-sensitive simulation.' },
          { title: 'Traceability', content: 'Log structures inspired by blockchain to preserve and audit decision provenance.' }
        ]
      }
    ]
  },
  'service-5': {
    icon: '🤖',
    title: 'Adaptive + Support',
    sections: [
      {
        title: 'Overview',
        content: 'We provide adaptive decision support systems grounded in clinical evidence and responsive to real-time user behavior and data.',
        subsections: [
          { title: 'Decision Support Systems', content: 'AI modules for real-time clinical guidance across settings: primary care, acute care, and population health.' },
          { title: 'Evidence Integration', content: 'Automated ingestion of peer-reviewed research, registry data, and clinical guidelines.' }
        ]
      },
      {
        title: 'Adaptation & Personalization',
        content: 'Built-in feedback mechanisms allow the system to improve, personalize, and retain relevance over time.',
        subsections: [
          { title: 'Learning Mechanisms', content: 'Online learning and reinforcement strategies that adjust logic based on new evidence and outcomes.' },
          { title: 'Personalization Engine', content: 'Tailored recommendations aligned to patient history, goals, and preferences.' }
        ]
      }
    ]
  },
  'timeline-1': {
    icon: '🎲',
    title: 'Tactical — Chance Events',
    sections: [
      {
        title: 'Overview',
        content: 'Systems that respond to unpredictable events in real time, providing intelligent prioritization and escalation.',
        subsections: [
          { title: 'Detection + Triage', content: 'Real-time anomaly detection and classification to triage urgent events rapidly.' },
          { title: 'Response Logic', content: 'Rule-based protocols and alerting mechanisms triggered under defined thresholds.' }
        ]
      },
      {
        title: 'Infrastructure',
        content: 'Optimized for low-latency detection and decisioning.',
        subsections: [
          { title: 'Signal Routing', content: 'Edge and cloud hybrid systems with localized fail-safes.' },
          { title: 'Decision Pathways', content: 'Tiered logic trees to route actions and accountability.' }
        ]
      }
    ]
  },
  'timeline-2': {
    icon: '📰',
    title: 'Informational — Weekly Sync',
    sections: [
      {
        title: 'Overview',
        content: 'Weekly data refresh cycles supporting operational awareness, audit, and system tuning.',
        subsections: [
          { title: 'Data Aggregation', content: 'Structured ingestion of updates from devices, EHRs, and analytic platforms.' },
          { title: 'Synchronization Patterns', content: 'Standardized ETL windows for consistency and integrity.' }
        ]
      },
      {
        title: 'Infrastructure + QA',
        content: 'Ensuring data quality across systems.',
        subsections: [
          { title: 'Update Logic', content: 'Incremental vs full loads guided by change frequency and impact tier.' },
          { title: 'Validation Checks', content: 'Schema matching, duplicate detection, and field-level consistency scoring.' }
        ]
      }
    ]
  },
  'timeline-3': {
    icon: '📅',
    title: 'Strategic — Quarterly Plans',
    sections: [
      {
        title: 'Overview',
        content: 'Structures to design, implement, and evaluate quarterly strategic priorities.',
        subsections: [
          { title: 'Milestone Management', content: 'Quarterly KPIs, budget cycles, and reporting dashboards.' },
          { title: 'Planning Systems', content: 'Goal-setting and accountability frameworks embedded in workflows.' }
        ]
      },
      {
        title: 'Execution Architecture',
        content: 'Digital tools to keep teams and plans aligned.',
        subsections: [
          { title: 'Dashboards + Alerts', content: 'Integrated with task systems to surface lagging metrics or unmet objectives.' },
          { title: 'Collaboration Channels', content: 'Asynchronous updates, real-time comments, and document version control.' }
        ]
      }
    ]
  },
  'timeline-4': {
    icon: '📍',
    title: 'Operational — Daily Flow',
    sections: [
      {
        title: 'Overview',
        content: 'Day-to-day execution of clinical, administrative, and analytic tasks — tracked and tuned through shared systems.',
        subsections: [
          { title: 'Work Coordination', content: 'Daily checklists, task routing, and process status views for staff.' },
          { title: 'Efficiency Monitoring', content: 'Cycle time and load metrics surface friction or bottlenecks.' }
        ]
      },
      {
        title: 'Management Routines',
        content: 'Systemized huddles, escalation protocols, and distributed logs.',
        subsections: [
          { title: 'Shift Reporting', content: 'Start-of-day briefings, handoff notes, and end-of-day summaries.' },
          { title: 'Data Capture', content: 'Structured fields and inline notes to preserve audit-ready detail.' }
        ]
      }
    ]
  },
  'timeline-5': {
    icon: '♾️',
    title: 'Existential — Recursive Meaning',
    sections: [
      {
        title: 'Overview',
        content: 'Philosophical grounding and reflective cycles to ensure technology remains human-centered and just.',
        subsections: [
          { title: 'Ethics-as-Architecture', content: 'Design principles informed by moral philosophy and lived experience.' },
          { title: 'Recursive Impact', content: 'Feedback loops to assess how systems shape — and are shaped by — users and institutions.' }
        ]
      },
      {
        title: 'Mission Alignment',
        content: 'Making visible the values encoded in algorithms.',
        subsections: [
          { title: 'Accountability Structures', content: 'Governance and disclosure layers built into infrastructure.' },
          { title: 'Purpose Calibration', content: 'Ongoing stakeholder engagement and scenario analysis.' }
        ]
      }
    ]
  }
};

// Function to load HTML content into a div
function loadHTML(elementId, url) {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${url}`);
      return response.text();
    })
    .then(data => {
      document.getElementById(elementId).innerHTML = data;
      // Populate app-grid after loading header
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
        } else {
          console.error('gridMenu not found after loading header');
        }
      }
      // Rebind modal event listeners after loading services/timeline sections
      if (elementId === 'services-section' || elementId === 'metrics-section') {
        document.querySelectorAll('[data-modal]').forEach(element => {
          element.removeEventListener('click', modalClickHandler); // Prevent duplicate listeners
          element.addEventListener('click', modalClickHandler);
        });
      }
    })
    .catch(error => console.error(`Error loading ${url}:`, error));
}

// Modal click handler
function modalClickHandler() {
  const modalId = this.getAttribute('data-modal');
  openModal(modalId);
}

// Modal functions
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

// Load content for each section
document.addEventListener('DOMContentLoaded', () => {
  loadHTML('header', 'assets/html/header.html');
  loadHTML('hero', 'assets/html/hero.html');
  loadHTML('services-section', 'assets/html/services-section.html');
  loadHTML('metrics-section', 'assets/html/metrics-section.html');
  loadHTML('modal-overlay', 'assets/html/modal-overlay.html');
  loadHTML('footer-placeholder', 'assets/html/footer.html');

  // Apply body.loaded for logo animation
  document.body.classList.add('loaded');

  // Modal event listeners
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
});