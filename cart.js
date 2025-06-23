// cart.js
const CART_KEY = "dxnCartItems";

// Your product catalog with IDs, names and prices matching products page data-id
const PRODUCT_CATALOG = {
  'prod-rg': { name: "DXN Reishi Gano (RG)", price: 670 },
  'prod-gl': { name: "DXN Ganocelium (GL)", price: 515 },
  'prod-noni-juice': { name: "DXN Noni Juice", price: 1020 },
  'prod-morinzhi': { name: "DXN Morinzhi", price: 935 },
  'prod-roselle-juice': { name: "DXN Roselle Juice", price: 625 },
  'prod-moringa-capsules': { name: "DXN Moringa Capsules", price: 400 },
  'prod-noni-capsules': { name: "DXN Noni Capsules", price: 400 },
  'prod-brahmi': { name: "DXN Brahmi", price: 475 }
};

// Load cart object from localStorage
function loadCart() {
  try {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : {};
  } catch (e) {
    console.error("Error reading cart from localStorage", e);
    localStorage.removeItem(CART_KEY);
    return {};
  }
}

// Save cart object to localStorage
function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error("Error saving cart to localStorage", e);
  }
}

// Calculate delivery charges according to subtotal
function calculateDeliveryCharges(subtotal) {
  if (subtotal < 2000) return 100;
  if (subtotal >= 2000 && subtotal < 4000) return 75;
  if (subtotal >= 4000 && subtotal < 6000) return 50;
  return 0;
}

// Render the cart items into the table and update totals
function renderCart() {
  const cart = loadCart();
  const tbody = document.getElementById("cartBody");
  const subtotalElem = document.getElementById("subtotal");
  const deliveryElem = document.getElementById("deliveryCharges");
  const grandTotalElem = document.getElementById("grandTotal");
  const buyAllBtn = document.getElementById("buyAllBtn");

  tbody.innerHTML = ""; // clear existing rows

  let subtotal = 0;
  let hasItems = false;

  for (const productId in cart) {
    if (!PRODUCT_CATALOG[productId]) {
      console.warn(`Product ID ${productId} not in catalog`);
      continue;
    }
    const quantity = cart[productId];
    if (quantity < 1) continue;
    hasItems = true;

    const { name, price } = PRODUCT_CATALOG[productId];
    const totalPrice = price * quantity;
    subtotal += totalPrice;

    const tr = document.createElement("tr");

    // Product Name
    const tdName = document.createElement("td");
    tdName.textContent = name;
    tr.appendChild(tdName);

    // Quantity (with + and - buttons)
    const tdQuantity = document.createElement("td");
    tdQuantity.style.textAlign = "center";

    const btnDecrease = document.createElement("button");
    btnDecrease.textContent = "-";
    btnDecrease.setAttribute("aria-label", `Decrease quantity of ${name}`);
    btnDecrease.style.marginRight = "8px";
    btnDecrease.addEventListener("click", () => {
      if (cart[productId] > 1) {
        cart[productId]--;
        saveCart(cart);
        renderCart();
      }
    });

    const spanQty = document.createElement("span");
    spanQty.textContent = quantity;
    spanQty.style.minWidth = "20px";
    spanQty.style.display = "inline-block";

    const btnIncrease = document.createElement("button");
    btnIncrease.textContent = "+";
    btnIncrease.setAttribute("aria-label", `Increase quantity of ${name}`);
    btnIncrease.style.marginLeft = "8px";
    btnIncrease.addEventListener("click", () => {
      cart[productId]++;
      saveCart(cart);
      renderCart();
    });

    tdQuantity.appendChild(btnDecrease);
    tdQuantity.appendChild(spanQty);
    tdQuantity.appendChild(btnIncrease);
    tr.appendChild(tdQuantity);

    // Price per item
    const tdPrice = document.createElement("td");
    tdPrice.textContent = price.toFixed(2);
    tdPrice.style.textAlign = "center";
    tr.appendChild(tdPrice);

    // Total price for product line
    const tdTotal = document.createElement("td");
    tdTotal.textContent = totalPrice.toFixed(2);
    tdTotal.style.textAlign = "center";
    tr.appendChild(tdTotal);

    // Remove button cell
    const tdRemove = document.createElement("td");
    tdRemove.style.textAlign = "center";
    const btnRemove = document.createElement("button");
    btnRemove.textContent = "Remove";
    btnRemove.setAttribute("aria-label", `Remove ${name} from cart`);
    btnRemove.classList.add("remove-btn");
    btnRemove.addEventListener("click", () => {
      if (confirm(`Remove ${name} from your cart?`)) {
        delete cart[productId];
        saveCart(cart);
        renderCart();
      }
    });
    tdRemove.appendChild(btnRemove);
    tr.appendChild(tdRemove);

    tbody.appendChild(tr);
  }

  if (!hasItems) {
    // Show empty cart message, disable buyAll
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; font-weight:bold; padding:1.5em; color:#a4d57a;">Your cart is empty</td></tr>`;
    subtotalElem.textContent = "0";
    deliveryElem.textContent = "0";
    grandTotalElem.textContent = "0";
    buyAllBtn.disabled = true;
    return;
  }

  subtotalElem.textContent = subtotal.toFixed(2);
  const deliveryCharges = calculateDeliveryCharges(subtotal);
  deliveryElem.textContent = deliveryCharges.toFixed(2);
  grandTotalElem.textContent = (subtotal + deliveryCharges).toFixed(2);
  buyAllBtn.disabled = false;
}

// When Buy All clicked - redirect to checkout.html passing total amount
function buyAll() {
  const grandTotalElem = document.getElementById("grandTotal");
  const totalAmount = grandTotalElem.textContent;
  if (totalAmount === "0") {
    alert("Your cart is empty");
    return;
  }
  // Example: pass total in URL param, adapt as needed
  window.location.href = `checkout.html?total=${encodeURIComponent(totalAmount)}`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  document.getElementById("buyAllBtn").addEventListener("click", buyAll);
});