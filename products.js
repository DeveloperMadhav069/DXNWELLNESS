const CART_KEY = "dxnCartItems";

function loadCart() {
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    console.error("Error loading cart:", e);
    localStorage.removeItem(CART_KEY);
    return {};
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error("Error saving cart:", e);
  }
}

function addToCart(productId, productName) {
  if (!productId) return;
  const cart = loadCart();

  if(cart[productId]) {
    cart[productId] += 1;
  } else {
    cart[productId] = 1;
  }

  saveCart(cart);
  alert(`Added "${productName}" to cart! Quantity: ${cart[productId]}`);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".btn.add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".product-card");
      if (!card) return;

      const id = card.getAttribute("data-id");
      const name = card.getAttribute("data-name");

      if (!id || !name) {
        console.error("Product info missing");
        return;
      }

      addToCart(id, name);
    });
  });
});