// Enhanced Tooltip System for Ukubona Landing Page
// This replaces the CSS-only tooltips with a more robust JavaScript solution

class TooltipManager {
    constructor() {
        this.tooltip = null;
        this.currentTarget = null;
        this.hideTimeout = null;
        this.init();
    }

    init() {
        this.createTooltip();
        this.bindEvents();
    }

    createTooltip() {
        // Remove existing tooltip if any
        const existingTooltip = document.getElementById('dynamic-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }

        // Create new tooltip element
        this.tooltip = document.createElement('div');
        this.tooltip.id = 'dynamic-tooltip';
        this.tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.95);
            color: #fff;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            font-size: 0.9rem;
            line-height: 1.5;
            max-width: 350px;
            text-align: center;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
            z-index: 10000;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            pointer-events: none;
            transform: translateY(10px);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        `;
        
        document.body.appendChild(this.tooltip);
    }

    showTooltip(target, text) {
        if (!text || this.currentTarget === target) return;

        this.currentTarget = target;
        this.tooltip.textContent = text;
        
        // Clear any existing hide timeout
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }

        // Position tooltip
        this.positionTooltip(target);
        
        // Show tooltip
        this.tooltip.style.opacity = '1';
        this.tooltip.style.visibility = 'visible';
        this.tooltip.style.transform = 'translateY(0)';
    }

    hideTooltip() {
        this.currentTarget = null;
        this.tooltip.style.opacity = '0';
        this.tooltip.style.visibility = 'hidden';
        this.tooltip.style.transform = 'translateY(10px)';
    }

    positionTooltip(target) {
        const rect = target.getBoundingClientRect();
        const tooltipRect = this.tooltip.getBoundingClientRect();
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        let top, left;

        // Default position: below the target
        top = rect.bottom + 10 + window.scrollY;
        left = rect.left + (rect.width / 2) - (tooltipRect.width / 2) + window.scrollX;

        // Adjust if tooltip goes off-screen horizontally
        if (left < 10) {
            left = 10;
        } else if (left + tooltipRect.width > viewport.width - 10) {
            left = viewport.width - tooltipRect.width - 10;
        }

        // Adjust if tooltip goes off-screen vertically
        if (top + tooltipRect.height > viewport.height + window.scrollY - 10) {
            // Position above the target instead
            top = rect.top - tooltipRect.height - 10 + window.scrollY;
        }

        this.tooltip.style.top = `${top}px`;
        this.tooltip.style.left = `${left}px`;
    }

    bindEvents() {
        // Handle all elements with data-tooltip attribute
        const handleMouseEnter = (e) => {
            const tooltipText = e.target.getAttribute('data-tooltip');
            if (tooltipText) {
                this.showTooltip(e.target, tooltipText);
            }
        };

        const handleMouseLeave = (e) => {
            if (e.target.hasAttribute('data-tooltip')) {
                this.hideTimeout = setTimeout(() => {
                    this.hideTooltip();
                }, 100);
            }
        };

        // Use event delegation for better performance
        document.addEventListener('mouseover', handleMouseEnter);
        document.addEventListener('mouseout', handleMouseLeave);

        // Handle window resize
        window.addEventListener('resize', () => {
            if (this.currentTarget) {
                this.positionTooltip(this.currentTarget);
            }
        });

        // Handle scroll
        window.addEventListener('scroll', () => {
            if (this.currentTarget) {
                this.positionTooltip(this.currentTarget);
            }
        });
    }
}

// Modal Management for Pentagon Elements
class ModalManager {
    constructor() {
        this.modal = document.getElementById('modalOverlay');
        this.modalIcon = document.getElementById('modalIcon');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalBody = document.getElementById('modalBody');
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupModalContent();
    }

    bindEvents() {
        // Close modal when clicking overlay
        this.modal?.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal?.classList.contains('active')) {
                this.closeModal();
            }
        });

        // Handle pentagon clicks
        document.addEventListener('click', (e) => {
            const modalTrigger = e.target.closest('[data-modal]');
            if (modalTrigger) {
                e.preventDefault();
                const modalId = modalTrigger.getAttribute('data-modal');
                this.openModal(modalId);
            }
        });
    }

    setupModalContent() {
        this.modalContent = {
            'service-1': {
                icon: '🌊',
                title: 'Data Intelligence',
                content: `
                    <div class="modal-section">
                        <h3>Smart Data Pipelines</h3>
                        <p>We transform raw health information into actionable insights through advanced data processing and analytics.</p>
                        
                        <div class="modal-subsection">
                            <h4>Real-time Processing</h4>
                            <p>Stream health data from multiple sources with low-latency processing for immediate insights.</p>
                        </div>
                        
                        <div class="modal-subsection">
                            <h4>Predictive Analytics</h4>
                            <p>Machine learning models that anticipate health trends and identify intervention opportunities.</p>
                        </div>
                        
                        <div class="modal-subsection">
                            <h4>Integration Hub</h4>
                            <p>Seamlessly connect disparate health systems and data sources into unified intelligence.</p>
                        </div>
                    </div>
                `
            },
            'service-2': {
                icon: '❤️',
                title: 'Human-Centered Design',
                content: `
                    <div class="modal-section">
                        <h3>Intuitive Health Interfaces</h3>
                        <p>We design interfaces that connect patients, providers, and health systems through empathetic, user-focused experiences.</p>
                        
                        <div class="modal-subsection">
                            <h4>Patient Empowerment</h4>
                            <p>Tools that give patients control over their health journey with clear, actionable information.</p>
                        </div>
                        
                        <div class="modal-subsection">
                            <h4>Provider Efficiency</h4>
                            <p>Streamlined workflows that reduce administrative burden and enhance clinical decision-making.</p>
                        </div>
                        
                        <div class="modal-subsection">
                            <h4>Accessibility First</h4>
                            <p>Universal design principles ensuring health technology works for everyone, regardless of ability.</p>
                        </div>
                    </div>
                `
            },
            'service-3': {
                icon: '🔁',
                title: 'Decision Intelligence',
                content: `
                    <div class="modal-section">
                        <h3>AI-Powered Care Decisions</h3>
                        <p>Advanced decision engines that support evidence-based care delivery across all healthcare settings.</p>
                        
                        <div class="modal-subsection">
                            <h4>Clinical Decision Support</h4>
                            <p>AI that augments clinical judgment with evidence-based recommendations and risk assessments.</p>
                        </div>
                        
                        <div class="modal-subsection">
                            <h4>Personalized Care Pathways</h4>
                            <p>Dynamic treatment plans that adapt based on individual patient responses and outcomes.</p>
                        </div>
                        
                        <div class="modal-subsection">
                            <h4>Quality Assurance</h4>
                            <p>Continuous monitoring and improvement of care quality through intelligent feedback loops.</p>
                        </div>
                    </div>
                `
            },
            'service-4': {
                icon: '🎭',
                title: 'Health Modeling',
                content: `
                    <div class="modal-section">
                        <h3>Digital Health Simulations</h3>
                        <p>Comprehensive modeling systems that test and validate care approaches before real-world implementation.</p>
                        
                        <div class="modal-subsection">
                            <h4>Population Health Models</h4>
                            <p>Simulate health outcomes across diverse populations to optimize intervention strategies.</p>
                        </div>
                        
                        <div class="modal-subsection">
                            <h4>Care Pathway Testing</h4>
                            <p>Virtual testing environments for new care models, reducing risk and improving outcomes.</p>
                        </div>
                        
                        <div class="modal-subsection">
                            <h4>Resource Optimization</h4>
                            <p>Model resource allocation and capacity planning to maximize healthcare efficiency.</p>
                        </div>
                    </div>
                `
            },
            'service-5': {
                icon: '🤖',
                title: 'Adaptive Systems',
                content: `
                    <div class="modal-section">
                        <h3>Self-Learning Health Infrastructure</h3>
                        <p>Systems that continuously learn and evolve with changing health needs, evidence, and technology.</p>
                        
                        <div class="modal-subsection">
                            <h4>Continuous Learning</h4>
                            <p>AI systems that improve performance through real-world feedback and outcomes data.</p>
                        </div>
                        
                        <div class="modal-subsection">
                            <h4>Dynamic Adaptation</h4>
                            <p>Infrastructure that automatically adjusts to new clinical guidelines and best practices.</p>
                        </div>
                        
                        <div class="modal-subsection">
                            <h4>Scalable Architecture</h4>
                            <p>Cloud-native systems designed to grow with healthcare organizations and changing needs.</p>
                        </div>
                    </div>
                `
            },
            'timeline-1': {
                icon: '🎲',
                title: 'Tactical',
                content: `
                    <div class="modal-section">
                        <h3>Immediate Response Systems</h3>
                        <p>Real-time capabilities for urgent health events and unexpected challenges that require immediate action.</p>
                        
                        <div class="modal-subsection">
                            <h4>Crisis Management</h4>
                            <p>Rapid response protocols for health emergencies and system failures.</p>
                        </div>
                        
                        <div class="modal-subsection">
                            <h4>Alert Systems</h4>
                            <p>Intelligent notifications that prioritize critical health events and interventions.</p>
                        </div>
                        
                        <div class="modal-subsection">
                            <h4>Emergency Protocols</h4>
                            <p>Automated workflows that activate during health crises and urgent care situations.</p>
                        </div>
                    </div>
                `
            },
            'timeline-2': {
                icon: '📰',
                title: 'Informational',
                content: `
                    <div class="modal-section">
                        <h3>Continuous Health Monitoring</h3>
                        <p>Regular health data synchronization and monitoring across all connected platforms and systems.</p>
                        
                        <div class="modal-subsection">
                            <h4>Data Synchronization</h4>
                            <p>Seamless updates across all health systems and platforms in real-time.</p>
                        </div>
                        
                        <div class="modal-subsection">
                            <h4>Health Dashboards</h4>
                            <p>Comprehensive views of patient health status and system performance metrics.</p>
                        </div>
                        
                        <div class="modal-subsection">
                            <h4>Trend Analysis</h4>
                            <p>Ongoing analysis of health patterns and emerging trends in patient populations.</p>
                        </div>
                    </div>
                `
            },
            'timeline-3': {
                icon: '📅',
                title: 'Strategic',
                content: `
                    <div class="modal-section">
                        <h3>Long-term Health Planning</h3>
                        <p>Strategic planning for population health, resource allocation, and healthcare system development.</p>
                        
                        <div class="modal-subsection">
                            <h4>Population Health Strategy</h4>
                            <p>Long-term planning for community health outcomes and intervention strategies.</p>
                        </div>
                        
                        <div class="modal-subsection">
                            <h4>Resource Planning</h4>
                            <p>Strategic allocation of healthcare resources based on predictive modeling and needs assessment.</p>
                        </div>
                        
                        <div class="modal-subsection">
                            <h4>Policy Development</h4>
                            <p>Evidence-based policy recommendations for healthcare systems and organizations.</p>
                        </div>
                    </div>
                `
            },
            'timeline-4': {
                icon: '📍',
                title: 'Operational',
                content: `
                    <div class="modal-section">
                        <h3>Daily Health Operations</h3>
                        <p>Day-to-day health operations management and workflow optimization for healthcare delivery.</p>
                        
                        <div class="modal-subsection">
                            <h4>Workflow Optimization</h4>
                            <p>Streamlined processes that improve efficiency in healthcare delivery and administration.</p>
                        </div>
                        
                        <div class="modal-subsection">
                            <h4>Quality Metrics</h4>
                            <p>Continuous monitoring of care quality and operational performance indicators.</p>
                        </div>
                        
                        <div class="modal-subsection">
                            <h4>Staff Coordination</h4>
                            <p>Tools for healthcare team coordination and communication optimization.</p>
                        </div>
                    </div>
                `
            },
            'timeline-5': {
                icon: '♾️',
                title: 'Existential',
                content: `
                    <div class="modal-section">
                        <h3>Healthcare Philosophy & Meaning</h3>
                        <p>Deep exploration of healthcare philosophy, ethics, and the fundamental meaning of care delivery.</p>
                        
                        <div class="modal-subsection">
                            <h4>Ethical Frameworks</h4>
                            <p>Philosophical foundations that guide healthcare decision-making and technology development.</p>
                        </div>
                        
                        <div class="modal-subsection">
                            <h4>Purpose-Driven Care</h4>
                            <p>Understanding the deeper meaning and purpose behind healthcare interventions and outcomes.</p>
                        </div>
                        
                        <div class="modal-subsection">
                            <h4>Holistic Wellness</h4>
                            <p>Comprehensive approach to health that considers physical, mental, and spiritual well-being.</p>
                        </div>
                    </div>
                `
            }
        };
    }

    openModal(modalId) {
        const content = this.modalContent[modalId];
        if (!content || !this.modal) return;

        this.modalIcon.textContent = content.icon;
        this.modalTitle.textContent = content.title;
        this.modalBody.innerHTML = content.content;

        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        if (!this.modal) return;
        
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize tooltip system
    new TooltipManager();
    
    // Initialize modal system
    new ModalManager();
    
    // Make closeModal function globally available for the HTML close button
    window.closeModal = () => {
        const modal = document.getElementById('modalOverlay');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };
});

// Export for use in other files if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TooltipManager, ModalManager };
}
