/**
 * Animations & Interactions Logic
 * Handles Intersection Observer for scroll reveals, parallax, etc.
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initParallax();
});

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: Stop observing once revealed if you don't want it to hide again
        // observer.unobserve(entry.target); 
      }
    });
  };

  const revealOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
}

function initParallax() {
  // Simple subtle parallax effect for elements with .parallax class
  window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(el => {
      const speed = el.dataset.speed || 0.2;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}
