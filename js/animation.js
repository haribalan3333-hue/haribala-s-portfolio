/* ==========================================================================
   ANIMATION.JS - Custom 60FPS UI Interaction, Parallax, Tilts & Count-ups
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Page Loader Fade-out
  const pageLoader = document.querySelector('.page-loader');
  if (pageLoader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        pageLoader.classList.add('loaded');
        // Trigger reveal on elements in viewport after load
        revealOnScroll();
      }, 1000);
    });
  }

  // 2. Intersection Observer for Scroll Reveals
  const revealItems = document.querySelectorAll('.reveal-item');
  
  function revealOnScroll() {
    const observerOptions = {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          
          // Trigger special children animations
          if (entry.target.classList.contains('skill-chip')) {
            animateSkillProgress(entry.target);
          }
          if (entry.target.classList.contains('about-grid') || entry.target.id === 'about') {
            animateCounters();
          }

          observer.unobserve(entry.target); // Trigger only once
        }
      });
    }, observerOptions);

    revealItems.forEach(item => {
      revealObserver.observe(item);
    });
  }

  // Fallback if load event already fired or is slow
  if (document.readyState === 'complete') {
    revealOnScroll();
  } else {
    window.addEventListener('load', revealOnScroll);
  }

  // 3. Circular Progress bar animation
  function animateSkillProgress(skillChip) {
    const percentAttr = skillChip.getAttribute('data-pct');
    if (!percentAttr) return;

    const percent = parseInt(percentAttr, 10);
    const circleVal = skillChip.querySelector('.circular-progress-val');
    
    if (circleVal) {
      // Circumference of radius 36 is ~226
      const circumference = 226;
      const offset = circumference - (percent / 100) * circumference;
      skillChip.style.setProperty('--dashoffset', offset);
    }

    // Animate percentage count up text inside skill bar
    const progressText = skillChip.querySelector('.circular-progress-text');
    if (progressText) {
      let count = 0;
      const duration = 1500; // 1.5s
      const steps = percent;
      const intervalSpeed = duration / steps;
      
      const timer = setInterval(() => {
        count++;
        progressText.textContent = `${count}%`;
        if (count >= percent) {
          clearInterval(timer);
        }
      }, intervalSpeed);
    }
  }

  // 4. Count Up Stats in About section
  let countersAnimated = false;
  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    const counters = document.querySelectorAll('.stat-count');
    counters.forEach(counter => {
      const targetVal = parseInt(counter.getAttribute('data-target'), 10);
      const isTimeFormat = counter.getAttribute('data-format') === 'time'; // e.g. "24/7"
      
      if (isTimeFormat) {
        // Special animation for 24/7
        counter.textContent = '00/0';
        setTimeout(() => { counter.textContent = '24/7'; }, 1000);
        return;
      }

      let count = 0;
      const duration = 2000; // 2s
      const increment = targetVal / (duration / 16); // ~60fps
      
      const updateCount = () => {
        count += increment;
        if (count < targetVal) {
          counter.textContent = Math.floor(count) + '+';
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = targetVal + '+';
        }
      };
      
      updateCount();
    });
  }

  // 5. 3D Mouse Tilt Animation (for Hero profile photo & projects)
  if (!prefersReducedMotion) {
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        
        // Mouse coordinate offsets from element center
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation angles (max 12deg tilt)
        const rotateX = ((centerY - y) / centerY) * 12;
        const rotateY = ((x - centerX) / centerX) * 12;
        
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      });
    });
  }

  // 6. Generate Dynamic Firefly Particles in Background
  function spawnFireflies() {
    if (prefersReducedMotion) return;
    
    const auroraContainer = document.querySelector('.aurora-bg');
    if (!auroraContainer) return;

    const fireflyCount = 25;
    for (let i = 0; i < fireflyCount; i++) {
      const firefly = document.createElement('div');
      firefly.className = 'firefly';
      
      // Random coordinates inside window bounds
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      
      // Random drift parameters
      const driftX = (Math.random() - 0.5) * 120;
      const driftY = (Math.random() - 0.5) * 120;
      const duration = Math.random() * 8 + 6; // 6s - 14s
      const opacity = Math.random() * 0.6 + 0.2;
      const scale = Math.random() * 1.5 + 0.5;

      firefly.style.left = `${x}px`;
      firefly.style.top = `${y}px`;
      firefly.style.transform = `scale(${scale})`;
      
      firefly.style.setProperty('--firefly-drift-x', `${driftX}px`);
      firefly.style.setProperty('--firefly-drift-y', `${driftY}px`);
      firefly.style.setProperty('--firefly-duration', `${duration}s`);
      firefly.style.setProperty('--firefly-opacity', opacity);

      auroraContainer.appendChild(firefly);
    }
  }

  spawnFireflies();

  // 7. Dynamic Shooting Stars Generator
  function spawnShootingStars() {
    if (prefersReducedMotion) return;

    const starfield = document.querySelector('.starfield');
    if (!starfield) return;

    const starsCount = 4;
    for (let i = 0; i < starsCount; i++) {
      const star = document.createElement('div');
      star.className = 'shooting-star';

      const top = Math.random() * 40; // Top 40% of page
      const left = Math.random() * 80 + 20; // Starts from middle right
      const duration = Math.random() * 3 + 3; // 3s - 6s
      const delay = Math.random() * 15; // Delay trigger times

      star.style.setProperty('--star-top', `${top}%`);
      star.style.setProperty('--star-left', `${left}%`);
      star.style.setProperty('--star-duration', `${duration}s`);
      star.style.setProperty('--star-delay', `${delay}s`);

      starfield.appendChild(star);
    }
  }

  spawnShootingStars();

  // 8. Custom hover coordinates tracker for Card Hover Glows
  const glowCards = document.querySelectorAll('.glass-card');
  glowCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
});
