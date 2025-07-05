feather.replace();

document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    const subject = encodeURIComponent(`${data.subject ? data.subject + ': ' : ''}Message from ${data.name}`);
    const body = encodeURIComponent(`
Name: ${data.name}
Email: ${data.email}
Organization: ${data.organization || 'Not specified'}
Role: ${data.role || 'Not specified'}
Subject: ${data.subject || 'General inquiry'}

Message:
${data.message}

${data.updates ? 'Please add me to your updates list.' : ''}
    `.trim());
    const mailtoLink = `mailto:ukubona.llc@gmail.com?subject=${subject}&body=${body}`;
    const submitButton = this.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i data-feather="check"></i> Opening email client...';
    submitButton.disabled = true;
    window.location.href = mailtoLink;
    setTimeout(() => {
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        feather.replace();
    }, 3000);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
