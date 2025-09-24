const passwordField = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");
const generateBtn = document.getElementById("generateBtn");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const upperCheck = document.getElementById("uppercase");
const lowerCheck = document.getElementById("lowercase");
const numberCheck = document.getElementById("numbers");
const symbolCheck = document.getElementById("symbols");

const strengthText = document.getElementById("strengthText");
const strengthBar = document.getElementById("strengthBar");

lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
});

function generatePassword() {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let chars = "";
  if (upperCheck.checked) chars += upper;
  if (lowerCheck.checked) chars += lower;
  if (numberCheck.checked) chars += numbers;
  if (symbolCheck.checked) chars += symbols;

  if (!chars) {
    passwordField.value = "⚠️ Select at least one option!";
    return;
  }

  let pass = "";
  for (let i = 0; i < lengthSlider.value; i++) {
    pass += chars[Math.floor(Math.random() * chars.length)];
  }

  passwordField.value = pass;
  updateStrength(pass);
}

function updateStrength(password) {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score += 2;

  if (score <= 3) {
    strengthText.textContent = "Weak";
    strengthBar.className = "weak";
    strengthBar.style.width = "30%";
  } else if (score <= 6) {
    strengthText.textContent = "Medium";
    strengthBar.className = "medium";
    strengthBar.style.width = "60%";
  } else {
    strengthText.textContent = "Strong";
    strengthBar.className = "strong";
    strengthBar.style.width = "100%";
  }
}

copyBtn.addEventListener("click", () => {
  if (!passwordField.value) return;
  navigator.clipboard.writeText(passwordField.value);
  copyBtn.textContent = "Copied!";
  setTimeout(() => (copyBtn.textContent = "Copy"), 2000);
});

generateBtn.addEventListener("click", generatePassword);
window.addEventListener("load", generatePassword);