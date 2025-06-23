// refund-shipping.js

// Accessibility: focus main content on page load for keyboard and screen reader users
document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  if(main){
    main.setAttribute('tabindex', '-1');
    main.focus();
  }
});