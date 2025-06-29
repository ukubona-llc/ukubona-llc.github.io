        // Theme toggle functionality
        const themeToggle = document.getElementById('toggle-theme');
        const html = document.documentElement;
        const logo = document.getElementById('logo');

        // Initialize theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        html.setAttribute('data-theme', savedTheme);
        updateThemeElements(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeElements(newTheme);
        });

        function updateThemeElements(theme) {
            themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
            
            if (logo) {
                logo.src = theme === 'dark' 
                    ? 'https://abikesa.github.io/logos/assets/ukubona-dark.png'
                    : 'https://abikesa.github.io/logos/assets/ukubona-light.png';
            }
        }

        // Grid menu toggle
        const menuIcon = document.getElementById('menuIcon');
        const gridMenu = document.getElementById('gridMenu');

        menuIcon.addEventListener('click', () => {
            gridMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuIcon.contains(e.target) && !gridMenu.contains(e.target)) {
                gridMenu.classList.remove('active');
            }
        });

        // Scroll progress indicator
        function updateScrollProgress() {
            const scrollTop = window.pageYOffset;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / documentHeight) * 100;
            
            document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
        }

        window.addEventListener('scroll', updateScrollProgress);

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }
            });
        }, observerOptions);

        // Observe all cards and sections
        document.querySelectorAll('.service-card, .metric-card, .section-title').forEach(el => {
            observer.observe(el);
        });

        // Add parallax effect to background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.bg-pattern::before');
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Add hover sound effects (optional)
        function addHoverSounds() {
            const hoverElements = document.querySelectorAll('.service-card, .metric-card, .cta-button');
            
            hoverElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    // You can add subtle audio feedback here if desired
                    el.style.transform += ' scale(1.02)';
                });
                
                el.addEventListener('mouseleave', () => {
                    el.style.transform = el.style.transform.replace(' scale(1.02)', '');
                });
            });
        }

        // Initialize hover effects
        addHoverSounds();

        // Performance optimization: Debounce scroll events
        let ticking = false;
        
        function updateOnScroll() {
            updateScrollProgress();
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        });
