

// Prevent ad.js from running outside ad pages
if (!location.pathname.includes("/damaged/ad") && !location.pathname.endsWith("/ad.html")) {
  console.log("ad.js blocked on:", location.pathname);
  throw new Error("Stop ad.js");
}

/* ad.js — For /damaged/ad.html only
   - Opens Stripe payment links from data-payment-link
   - Optional: plays product audio once per click (if <audio> exists in card)
*/

(function () {
  "use strict";

  // Helper: safely open Stripe link
  function openStripe(link) {
    if (!link) return;
    window.open(link, "_blank", "noopener,noreferrer");
  }

  // Click handler: Add to Bag -> open Stripe
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-buy");
    if (!btn) return;

    const card = btn.closest(".product-card");
    if (!card) return;

    const link = card.dataset.paymentLink;
    if (!link) {
      alert("This product is missing a Stripe payment link.");
      return;
    }

    // Optional: play audio inside this card (if any)
    const audio = card.querySelector("audio");
    if (audio) {
      try {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } catch (_) {}
    }

    openStripe(link);
  });

  // Optional: flip-wrapper hover support for touch devices (tap to flip)
  document.addEventListener("click", (e) => {
    const flip = e.target.closest(".flip-wrapper");
    if (!flip) return;

    // Only do this if the flip-wrapper is inside a product card
    if (!flip.closest(".product-card")) return;

    flip.classList.toggle("is-flipped");
  });
})();
