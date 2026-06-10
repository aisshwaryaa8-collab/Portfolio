// =====================
// LOADER
// =====================
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    // Trigger hero reveal
    document.querySelector('.hero-content').classList.add('visible');
    document.querySelectorAll('.hero-art').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 150);
    });
  }, 1600);
});

// =====================
// CUSTOM CURSOR
// =====================
const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0;
let curX = 0, curY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Smooth cursor follow
function animateCursor() {
  curX += (mouseX - curX) * 0.12;
  curY += (mouseY - curY) * 0.12;
  cursor.style.left = curX + 'px';
  cursor.style.top = curY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Expand on hover over interactive elements
document.querySelectorAll('a, button, .project-card, .achievement-item').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('expanded'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('expanded'));
});

// Hide on mobile
if ('ontouchstart' in window) {
  cursor.style.display = 'none';
  document.body.style.cursor = 'auto';
}

// =====================
// NAV SCROLL EFFECT
// =====================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// =====================
// SCROLL REVEAL
// =====================
const revealEls = document.querySelectorAll(
  '.about-inner, .about-grid, .projects-inner, .projects-grid, .project-card, ' +
  '.skills-inner, .skills-art, .achievements-inner, .achievement-item, ' +
  '.contact-inner, .contact-art, .section-label, .section-title, .stat, ' +
  '.skill-group'
);

// Add reveal class
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Stagger children if it's a grid
      if (entry.target.classList.contains('projects-grid') ||
          entry.target.classList.contains('skills-grid') ||
          entry.target.classList.contains('about-stats')) {
        entry.target.querySelectorAll(':scope > *').forEach((child, i) => {
          child.style.transitionDelay = `${i * 0.1}s`;
          child.classList.add('visible');
        });
      }
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
});

revealEls.forEach(el => observer.observe(el));

// =====================
// PARALLAX ON ARTWORK
// =====================
const artImages = document.querySelectorAll('.hero-art img, .deco-blob img');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  artImages.forEach((img, i) => {
    const direction = i % 2 === 0 ? 1 : -1;
    img.style.transform = `translateY(${scrollY * 0.04 * direction}px)`;
  });
}, { passive: true });

// =====================
// SMOOTH ANCHOR SCROLL
// =====================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// =====================
// ACHIEVEMENT HOVER SOUND FEEL (visual only)
// =====================
document.querySelectorAll('.achievement-item').forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.06}s`;
});

// =====================
// TITLE BAR EASTER EGG
// =====================
document.addEventListener('visibilitychange', () => {
  document.title = document.hidden
    ? '👋 Come back!'
    : 'Aisshwarya A — Portfolio';
});
