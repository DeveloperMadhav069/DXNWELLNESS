document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('checkoutForm');
  const payBtn = document.getElementById('payBtn');
  const formMessage = document.getElementById('formMessage');

  // Get order amount from URL param or default ₹750
  const urlParams = new URLSearchParams(window.location.search);
  const amountInINR = parseFloat(urlParams.get('amount')) || 750; // default 750 INR
  // Razorpay needs amount in paise
  const amountInPaise = amountInINR * 100;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    formMessage.classList.add('hidden');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    payBtn.disabled = true;
    payBtn.textContent = "Processing...";

    // Prepare customer information data from form
    const options = {
      key: "rzp_test_YourTestKeyHere", // <- Replace with your Razorpay key (test/live)
      amount: amountInPaise, // in paise
      currency: "INR",
      name: "DXN Wellness",
      description: "Order Payment",
      // You can add order_id from backend if created securely
      handler: function (response) {
        // Payment successful callback
        formMessage.textContent = `Payment successful! Payment ID: ${response.razorpay_payment_id}`;
        formMessage.style.color = "#a4d57a";
        formMessage.classList.remove('hidden');
        payBtn.disabled = false;
        payBtn.textContent = "Pay Now";

        // You can also send payment details + form data to backend here for verification & fulfillment
        // Example: send data by fetch/AJAX
      },
      modal: {
        ondismiss: function () {
          // User closed the modal without paying
          payBtn.disabled = false;
          payBtn.textContent = "Pay Now";
          formMessage.textContent = "Payment cancelled.";
          formMessage.style.color = "#e06363";
          formMessage.classList.remove('hidden');
        }
      },
      prefill: {
        name: form.name.value,
        email: form.email.value,
        contact: form.phone.value
      },
      theme: {
        color: "#70b256"
      }
    };

    try {
      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      formMessage.textContent = "Error opening payment gateway. Please try again.";
      formMessage.style.color = "#e06363";
      formMessage.classList.remove('hidden');
      payBtn.disabled = false;
      payBtn.textContent = "Pay Now";
      console.error(error);
    }
  });
});