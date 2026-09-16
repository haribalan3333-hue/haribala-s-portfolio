/* ==========================================================================
   CURSOR.JS - Upgraded Fire Particle Cursor, Smooth Trail & Ripple Click Effects
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('fireCanvas');
  const ring = document.getElementById('cursorRing');

  if (!canvas || !ring) return;

  const ctx = canvas.getContext('2d');
  let W = window.innerWidth;
  let H = window.innerHeight;

  function resizeCanvas() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  let particles = [];
  let mouseX = W / 2;
  let mouseY = H / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let lastX = mouseX;
  let lastY = mouseY;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Track mouse coordinates
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!prefersReducedMotion) {
      // Calculate speed of cursor
      const speed = Math.hypot(mouseX - lastX, mouseY - lastY);
      
      // Spawn fire particles (more speed = more particles with higher velocity)
      const count = Math.min(8, Math.max(2, Math.floor(speed / 4)));
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 8 + 4;
        particles.push({
          x: mouseX + (Math.random() - 0.5) * 8,
          y: mouseY + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 1.5 + (mouseX - lastX) * 0.05,
          vy: -Math.random() * 2 - 0.8 + (mouseY - lastY) * 0.05,
          life: 1.0,
          decay: Math.random() * 0.02 + 0.015,
          size: size,
          maxSize: size * 1.2
        });
      }
    }
    lastX = mouseX;
    lastY = mouseY;
  });

  // Ripple effect on click
  window.addEventListener('click', (e) => {
    if (prefersReducedMotion) return;
    
    // Spawn extra explosion of fire particles
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 2;
      particles.push({
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        life: 1.0,
        decay: Math.random() * 0.03 + 0.02,
        size: Math.random() * 6 + 3,
        maxSize: Math.random() * 8 + 4
      });
    }

    // CSS Ripple element
    createClickRipple(e.clientX, e.clientY);
  });

  function createClickRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    document.body.appendChild(ripple);
    
    // Remove element after animation
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  }

  // Bind mouseenter and mouseleave on all interactive elements
  function bindHoverEvents() {
    const interactiveSelectors = 'a, button, select, textarea, input, .qa-btn, .theme-toggle, .swap-ic, .proj-card, .connect-card';
    document.querySelectorAll(interactiveSelectors).forEach((el) => {
      el.addEventListener('mouseenter', () => ring.classList.add('active'));
      el.addEventListener('mouseleave', () => ring.classList.remove('active'));
    });
  }
  
  bindHoverEvents();

  // Watch for dynamic DOM changes to bind new elements
  const observer = new MutationObserver(bindHoverEvents);
  observer.observe(document.body, { childList: true, subtree: true });

  // Render loop
  function drawCursor() {
    // 1. Smooth lerping trail for ring
    const lerpFactor = 0.18;
    ringX += (mouseX - ringX) * lerpFactor;
    ringY += (mouseY - ringY) * lerpFactor;

    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    // 2. Draw Fire particles
    ctx.clearRect(0, 0, W, H);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;
      p.vy -= 0.015; // Rising float effect

      if (p.life <= 0) return;

      const currentSize = p.size * p.life;
      
      // Radial glow gradient for fire particle
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize);
      
      // Luxury Gold/Ember particle colors
      grad.addColorStop(0, `rgba(255, 245, 210, ${p.life})`); // White core
      grad.addColorStop(0.3, `rgba(212, 175, 55, ${p.life * 0.95})`); // Gold middle
      grad.addColorStop(0.7, `rgba(255, 90, 31, ${p.life * 0.6})`); // Ember outer
      grad.addColorStop(1, 'rgba(193, 39, 45, 0)'); // Fading red edge

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
      ctx.fill();
    });

    particles = particles.filter((p) => p.life > 0);
    requestAnimationFrame(drawCursor);
  }

  if (!prefersReducedMotion) {
    requestAnimationFrame(drawCursor);
  } else {
    // Hide fire cursor entirely under reduced motion
    canvas.style.display = 'none';
    window.addEventListener('mousemove', () => {
      ring.style.left = `${mouseX}px`;
      ring.style.top = `${mouseY}px`;
    });
  }
});
