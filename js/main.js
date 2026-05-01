/**
 * Core Application Logic
 * Handles global components (Navbar, Footer), page transitions, and mobile menu.
 */

// Global Components HTML
const NAVBAR_HTML = `
  <nav class="navbar">
    <div class="container nav-container">
      <a href="index.html" class="logo">AG.</a>
      <div class="nav-links">
        <a href="about.html" class="link-underline">About</a>
        <a href="projects.html" class="link-underline">Work</a>
        <a href="contact.html" class="link-underline">Contact</a>
      </div>
      <button class="hamburger" aria-label="Toggle Menu">
        ☰
      </button>
    </div>
  </nav>
`;

const FOOTER_HTML = `
  <footer class="footer">
    <div class="container footer-content">
      <div class="footer-links">
        <a href="#" class="btn btn-outline" style="padding: 0.5rem 1rem; font-size:0.75rem;">Download Resume</a>
      </div>
      <div class="footer-links">
        <a href="https://behance.net" target="_blank" rel="noopener">Behance</a>
        <a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn</a>
      </div>
    </div>
  </footer>
`;

const OVERLAY_HTML = `<div class="page-transition-overlay"></div>`;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  injectComponents();
  initNavigation();
  initPageTransitions();
  highlightActiveLink();
});

function injectComponents() {
  // Inject Navbar at the top
  document.body.insertAdjacentHTML('afterbegin', NAVBAR_HTML);
  // Inject Footer at the bottom
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
  // Inject Overlay
  document.body.insertAdjacentHTML('beforeend', OVERLAY_HTML);
}

function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
    });
  }
}

function highlightActiveLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-links a');
  
  links.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentPath === linkPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
      link.style.color = 'var(--text-primary)';
      link.style.fontWeight = 'bold';
    }
  });
}

function initPageTransitions() {
  const overlay = document.querySelector('.page-transition-overlay');
  
  // Fade in on load
  setTimeout(() => {
    overlay.classList.remove('active');
  }, 100);

  // Handle internal links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && 
        link.href.includes(window.location.origin) && 
        !link.hasAttribute('target') &&
        !link.href.includes('#')) {
      
      e.preventDefault();
      
      const targetUrl = link.href;
      overlay.classList.add('active');
      
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 500); // Wait for overlay animation to complete
    }
  });
}
