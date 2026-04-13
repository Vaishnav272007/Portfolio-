// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── ACTIVE NAV LINK ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const observerOptions = { rootMargin: '-40% 0px -55% 0px' };
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, observerOptions);

sections.forEach(sec => sectionObserver.observe(sec));

// ── SCROLL-REVEAL CARDS ──
const revealEls = document.querySelectorAll('.skill-card, .project-card, .badge, .highlight');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = (i % 6) * 0.08 + 's';
      entry.target.classList.add('reveal');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});

// inject reveal class styles once
const style = document.createElement('style');
style.textContent = `.reveal { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

// ── CONTACT FORM ──
const form       = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn  = document.getElementById('submitBtn');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('nameInput').value.trim();
  const email   = document.getElementById('emailInput').value.trim();
  const message = document.getElementById('messageInput').value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = '⚠️ Please fill in all fields.';
    formStatus.style.color = '#ff6b2b';
    return;
  }

  // Simulate send (replace with EmailJS / Formspree for real sending)
  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;

  setTimeout(() => {
    formStatus.textContent = '✅ Message sent! I\'ll get back to you soon.';
    formStatus.style.color = '#4caf88';
    form.reset();
    submitBtn.textContent = 'Send Message ✉️';
    submitBtn.disabled = false;
  }, 1200);
});

// ── SMOOTH SCROLL FOR ALL ANCHOR LINKS ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
