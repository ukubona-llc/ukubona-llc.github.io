// assets/js/landing.js
function updateScrollProgress() {
    const scrolled = window.pageYOffset;
    const maxHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrolled / maxHeight) * 100;
    document.querySelector('.scroll-progress').style.width = progress + '%';
}

window.addEventListener('scroll', updateScrollProgress);

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = document.documentElement.getAttribute('data-theme') === 'dark' 
            ? 'rgba(10, 10, 15, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.background = document.documentElement.getAttribute('data-theme') === 'dark' 
            ? 'rgba(10, 10, 15, 0.8)' 
            : 'rgba(255, 255, 255, 0.9)';
    }
});

document.querySelector('.contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const button = e.target.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;
    setTimeout(() => {
        button.textContent = 'Message Sent!';
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            e.target.reset();
        }, 2000);
    }, 1000);
});