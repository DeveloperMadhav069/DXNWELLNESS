// privacy.js

// Placeholder for potential interactivity or accessibility enhancements

document.addEventListener('DOMContentLoaded', () => {
  // Auto focus main content for keyboard users
  const main = document.querySelector('main');
  if(main){
    main.setAttribute('tabindex', '-1');
    main.focus();
  }
});