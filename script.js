// document.addEventListener("DOMContentLoaded", () => {
//   const timeElement = document.querySelector('[data-testid="test-user-time"]');
//   if (timeElement) {
//     timeElement.textContent = `${Date.now()} ms`;
//   }
// });

// script.js
document.addEventListener("DOMContentLoaded", () => {
  // Home page time
  const timeElement = document.querySelector('[data-testid="test-user-time"]');
  if (timeElement) {
    timeElement.textContent = `${Date.now()} ms`;
  }

  // Navigation active state
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });

  // Contact form validation
  const form = document.getElementById("contact-form");
  if (form) {
    const successMsg = document.getElementById("success-message");
    const submitBtn = document.querySelector(
      '[data-testid="test-contact-submit"]',
    );

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const name = formData.get("name").trim();
      const email = formData.get("email").trim();
      const subject = formData.get("subject").trim();
      const message = formData.get("message").trim();

      let isValid = true;
      const errors = {};

      // Required fields
      if (!name) {
        errors.name = "Full name is required.";
        isValid = false;
      }
      if (!email) {
        errors.email = "Email is required.";
        isValid = false;
      }
      if (!subject) {
        errors.subject = "Subject is required.";
        isValid = false;
      }
      if (!message) {
        errors.message = "Message is required.";
        isValid = false;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRegex.test(email)) {
        errors.email = "Please enter a valid email.";
        isValid = false;
      }

      // Message length
      if (message && message.length < 10) {
        errors.message = "Message must be at least 10 characters.";
        isValid = false;
      }

      // Clear previous errors
      Object.keys(errors).forEach((field) => {
        const errorEl = document.getElementById(`${field}-error`);
        if (errorEl) errorEl.textContent = "";
      });

      // Show errors
      Object.entries(errors).forEach(([field, msg]) => {
        const errorEl = document.getElementById(`${field}-error`);
        if (errorEl) errorEl.textContent = msg;
      });

      if (isValid) {
        // Hide form, show success
        form.style.display = "none";
        successMsg.style.display = "block";
        submitBtn.disabled = true;
      }
    });

    // Real-time validation
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        const field = input.id;
        const value = input.value.trim();
        const errorEl = document.getElementById(`${field}-error`);
        if (errorEl) errorEl.textContent = "";

        if (input.hasAttribute("required") && !value) {
          errorEl.textContent = `${input.name} is required.`;
        } else if (
          input.type === "email" &&
          value &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ) {
          errorEl.textContent = "Please enter a valid email.";
        } else if (input.name === "message" && value.length < 10) {
          errorEl.textContent = "Message must be at least 10 characters.";
        }
      });
    });
  }
});
