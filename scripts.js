// scripts.js
;(function() {
  // Only run if add-to-cart buttons exist on page
  const addButtons = document.querySelectorAll('.add-to-cart');
  if(!addButtons.length) return;

  let cart = JSON.parse(localStorage.getItem('dxn_cart')) || [];

  function addToCartClick(e) {
    e.preventDefault();
    const card = e.target.closest('.product-card');
    if (!card) return;
    const {id, name, price} = card.dataset;
    const priceNum = parseFloat(price);

    const existingIndex = cart.findIndex(p => p.id === id);
    if (existingIndex > -1) {
      cart[existingIndex].quantity++;
    } else {
      cart.push({id, name, price: priceNum, quantity: 1});
    }

    localStorage.setItem('dxn_cart', JSON.stringify(cart));

    e.target.textContent = 'Added ✓';
    e.target.disabled = true;
    setTimeout(() => {
      e.target.textContent = `Add to Cart - ₹${price}`;
      e.target.disabled = false;
    }, 1400);
  }

  addButtons.forEach(btn => btn.addEventListener('click', addToCartClick));
})();

let cart = JSON.parse(localStorage.getItem('dxn_cart')) || [];