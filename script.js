// Smooth scrolling for navigation links
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

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.9)';
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to feature cards, steps, and pricing cards
document.querySelectorAll('.feature-card, .step, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Typing animation for chat messages
const chatMessages = document.querySelectorAll('.chat-messages .message');
chatMessages.forEach((msg, index) => {
    msg.style.opacity = '0';
    msg.style.transform = 'translateY(10px)';
    setTimeout(() => {
        msg.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        msg.style.opacity = '1';
        msg.style.transform = 'translateY(0)';
    }, 500 + (index * 800));
});

// Stats counter animation
const stats = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateValue(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));

function animateValue(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const hasM = text.includes('M');
    const numericValue = parseFloat(text.replace(/[^0-9.]/g, ''));

    let current = 0;
    const duration = 2000;
    const step = numericValue / (duration / 16);

    const animate = () => {
        current += step;
        if (current < numericValue) {
            let display = hasM ? current.toFixed(0) + 'M' : current.toFixed(1);
            if (hasPlus) display += '+';
            element.textContent = display;
            requestAnimationFrame(animate);
        } else {
            element.textContent = text;
        }
    };
    animate();
}
