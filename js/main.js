/* ==========================================================================
   MAIN.JS - Application Bootstrapping, Scroll Events & Mobile Nav Drawer
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle Drawer
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileOverlay = document.getElementById('mobileOverlay');

  if (menuBtn && mobileNav && mobileOverlay) {
    const toggleMenu = () => {
      mobileNav.classList.toggle('open');
      mobileOverlay.classList.toggle('show');
    };

    menuBtn.addEventListener('click', toggleMenu);
    mobileOverlay.addEventListener('click', toggleMenu);
    
    // Close mobile nav drawer when clicking links
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', toggleMenu);
    });
  }

  // 2. Sticky Header scroll tracking (Hide on Scroll Down, Show on Scroll Up)
  const header = document.querySelector('header');
  let lastScrollY = window.scrollY;
  const scrollThreshold = 10; // min scroll trigger range
  const navbarHeight = 84;

  // 3. Scroll Progress bar & Back-To-Top tracking
  const progressBar = document.getElementById('scrollProgressBar');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Header Hide/Show logic
    if (Math.abs(currentScrollY - lastScrollY) > scrollThreshold) {
      if (currentScrollY > lastScrollY && currentScrollY > navbarHeight) {
        // Scrolling Down
        header.classList.remove('nav-down');
        header.classList.add('nav-up');
      } else {
        // Scrolling Up
        header.classList.remove('nav-up');
        header.classList.add('nav-down');
      }
      
      // Keep clear top transparent
      if (currentScrollY <= navbarHeight) {
        header.classList.remove('nav-down');
      }
    }
    lastScrollY = currentScrollY;

    // Scroll Progress logic
    if (progressBar) {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScrollY / windowHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }

    // Back To Top Visibility logic
    if (backToTopBtn) {
      if (currentScrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    // Active Section Scroll Highlighting
    highlightActiveNav();
  });

  // 4. Back To Top click event
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 5. Active Section Highlighter
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('main section, main .hero');

  function highlightActiveNav() {
    let currentActiveSectionId = 'home';
    const scrollPosition = window.scrollY + 180; // offset for nav heights

    sections.forEach(sec => {
      const secTop = sec.offsetTop;
      const secHeight = sec.offsetHeight;
      if (scrollPosition >= secTop && scrollPosition < secTop + secHeight) {
        currentActiveSectionId = sec.id || 'home';
      }
    });

    navLinks.forEach(link => {
      const targetHref = link.getAttribute('href');
      if (targetHref === `#${currentActiveSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Initial call on page load
  highlightActiveNav();

  // 6. Resume Download click action override
  const resumeBtn = document.getElementById('resumeBtn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
      // Check if file exists, if not, speak advice
      const href = resumeBtn.getAttribute('href');
      if (href === '#' || href === '') {
        e.preventDefault();
        if (window.assistantSay) {
          window.assistantSay("Please add your resume PDF to assets/resume/resume.pdf to enable downloads.");
        }
      }
    });
  }
});
