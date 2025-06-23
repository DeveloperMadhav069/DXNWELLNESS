// terms.js

// Currently no required JS for static terms page, 
// but here is a placeholder for possible future enhancements.

// Example: Smooth focus to main content on page load for accessibility
document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  if (main) {
    main.setAttribute('tabindex', '-1');
    main.focus();
  }
});