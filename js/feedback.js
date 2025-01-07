const feedbackForm = document.getElementById('feedback-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');

feedbackForm.addEventListener('submit', function (e) {
  let isValid = true;

  // Validate Name
  const nameValue = nameInput.value.trim();
  if (!/^[a-zA-Z ]+$/.test(nameValue)) {
    isValid = false;
    nameError.textContent = 'Name can only contain letters and spaces.';
  } else {
    nameError.textContent = '';
  }

  // Validate Email
  const emailValue = emailInput.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    isValid = false;
    emailError.textContent = 'Please enter a valid email address.';
  } else {
    emailError.textContent = '';
  }

  if (!isValid) {
    e.preventDefault();
  }
});