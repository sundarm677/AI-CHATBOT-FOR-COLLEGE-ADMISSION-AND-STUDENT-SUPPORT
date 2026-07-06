/* ══════════════════════════════════════════════════════════
   Smart Campus AI — Design System v3 (JavaScript)
   ══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {
  // ── Initialize Loader ──
  initLoader();
  
  // ── Generate Particles ──
  generateParticles();
  
  // ── Custom Cursor ──
  initCustomCursor();
  
  // ── Card Tilt Effect ──
  initCardTilt();
  
  // ── Smooth Scroll ──
  initSmoothScroll();
  
  // ── Number Animation ──
  animateNumbers();
});

// ── Loader ──
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  
  // Simulate loading
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1500);
}

// ── Particles ──
function generateParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  
  const particleCount = Math.floor(Math.random() * 20) + 10;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = Math.random() * 5 + 10;
    const delay = Math.random() * 3;
    
    particle.style.left = left + '%';
    particle.style.top = top + '%';
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = delay + 's';
    
    container.appendChild(particle);
  }
}

// ── Custom Cursor ──
function initCustomCursor() {
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursor-ring');
  
  if (!cursor || !cursorRing) return;
  
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    document.body.classList.add('cursor-visible');
  }
  
  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX - 4 + 'px';
    cursor.style.top = mouseY - 4 + 'px';
    
    ringX += (mouseX - ringX - 15) * 0.15;
    ringY += (mouseY - ringY - 15) * 0.15;
    
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
  });
  
  document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
    cursorRing.style.display = 'none';
  });
  
  document.addEventListener('mouseenter', () => {
    if (!prefersReducedMotion) {
      cursor.style.display = 'block';
      cursorRing.style.display = 'block';
    }
  });
}

// ── Card Tilt Effect ──
function initCardTilt() {
  const cards = document.querySelectorAll('.sc-card-tilt');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });
}

// ── Smooth Scroll ──
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ── Number Animation ──
function animateNumbers() {
  const stats = document.querySelectorAll('.stat-num');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        const target = parseInt(entry.target.dataset.target);
        const suffix = entry.target.dataset.suffix || '';
        const duration = 2000; // 2 seconds
        const start = Date.now();
        
        const animate = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function (ease-out)
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(target * easeOut);
          
          entry.target.textContent = current + suffix;
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        
        animate();
        entry.target.dataset.animated = 'true';
      }
    });
  }, { threshold: 0.5 });
  
  stats.forEach(stat => observer.observe(stat));
}

// ── Page Transition ──
function transitionToPage(url) {
  const overlay = document.getElementById('transition-overlay');
  if (overlay) {
    overlay.classList.add('active');
    setTimeout(() => {
      window.location.href = url;
    }, 400);
  } else {
    window.location.href = url;
  }
}

// ── Prevent default navigation for demo ──
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && e.target.hasAttribute('data-dest')) {
    e.preventDefault();
    const dest = e.target.getAttribute('data-dest');
    transitionToPage(dest);
  }
});
