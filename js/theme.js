/* ==========================================================================
   THEME.JS - Luxury Light/Dark Mode Controller with Transitions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Initialize theme from localStorage or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
    setTheme('light');
  } else {
    setTheme('dark');
  }

  // Toggle button event listener
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      if (currentTheme === 'light') {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    });
  }

  function setTheme(theme) {
    // Enable transitioning styling to prevent initial page load transitions
    document.body.classList.add('theme-transitioning');
    
    if (theme === 'light') {
      html.setAttribute('data-theme', 'light');
      if (themeToggle) themeToggle.innerHTML = '🌙 Dark Mode';
      localStorage.setItem('theme', 'light');
    } else {
      html.setAttribute('data-theme', 'dark');
      if (themeToggle) themeToggle.innerHTML = '☀️ Light Mode';
      localStorage.setItem('theme', 'dark');
    }

    // Clean up transitioning class after transition completes
    setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
    }, 500);
  }
});
