AOS.init();

function submit() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();
  const validateMessage = document.querySelector(".validate-message");

  // Regex patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9+\-\s]{6,20}$/;
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  const subjectMinLength = 3;
  const messageMinLength = 10;

  // Reset message
  validateMessage.style.display = "block";
  validateMessage.style.color = "red";

  // Required fields
  if (
    name === "" ||
    email === "" ||
    phone === "" ||
    subject === "" ||
    message === ""
  ) {
    e.preventDefault();
    validateMessage.textContent = "All fields are required.";
    return;
  }

  // Name validation
  if (!nameRegex.test(name)) {
    e.preventDefault();
    validateMessage.textContent =
      "Name should only contain letters and spaces (2–50 chars).";
    return;
  }

  // Email validation
  if (!emailRegex.test(email)) {
    e.preventDefault();
    validateMessage.textContent = "Please enter a valid email address.";
    return;
  }

  // Phone validation
  if (!phoneRegex.test(phone)) {
    e.preventDefault();
    validateMessage.textContent = "Please enter a valid phone number.";
    return;
  }

  // Subject validation
  if (subject.length < subjectMinLength) {
    e.preventDefault();
    validateMessage.textContent = `Subject must be at least ${subjectMinLength} characters long.`;
    return;
  }

  // Message validation
  if (message.length < messageMinLength) {
    e.preventDefault();
    validateMessage.textContent = `Message must be at least ${messageMinLength} characters long.`;
    return;
  }

  // If everything is good
  validateMessage.style.color = "green";
  validateMessage.textContent = "Message sent successfully...";
}
