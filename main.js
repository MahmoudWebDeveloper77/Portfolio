AOS.init();

// main.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const nameField = document.getElementById("name");
  const phoneField = document.getElementById("phone");
  const emailField = document.getElementById("email");
  const validateMessage = document.querySelector(".validate-message");
  const green = getComputedStyle(document.documentElement).getPropertyValue(
    "--green"
  );
  const red = getComputedStyle(document.documentElement).getPropertyValue(
    "--red"
  );

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // stop default submit
    let isValid = true;
    let errorText = "";

    // Validate name (letters only, spaces allowed)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(nameField.value.trim())) {
      isValid = false;
      errorText = "Name must contain letters only";
    }

    // Validate email (basic email format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailField.value.trim())) {
      isValid = false;
      errorText = "Please add a real email address";
    }

    // Validate phone (numbers only, 7–15 digits)
    const phoneRegex = /^[0-9]{7,15}$/;
    if (!phoneRegex.test(phoneField.value.trim())) {
      isValid = false;
      errorText = "Please type a real phone number";
    }

    if (!isValid) {
      validateMessage.style.display = "block";
      validateMessage.textContent = errorText;
      validateMessage.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // ✅ If valid → send to Formspree via fetch
    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Error : ${response.status} - ${response.statusText}`);
      }

      if (response.ok) {
        validateMessage.style.display = "block";
        validateMessage.textContent = "Form submitted successfully";
        form.reset(); // clear form
      } else {
        validateMessage.style.display = "block";
        validateMessage.textContent =
          "There was a problem submitting your form";
      }
    } catch (err) {
      validateMessage.style.display = "block";
      validateMessage.style.color = "red";
      validateMessage.textContent = "Something went wrong. Please try again ";
      console.log("error submitting form", err);
    }

    // Scroll to the message
    validateMessage.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});
