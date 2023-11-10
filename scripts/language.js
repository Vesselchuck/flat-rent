let currentLanguage;

// Function to load translations
function loadTranslations(language) {
  fetch(`lang/${language}.json`)
    .then(response => response.json())
    .then(data => {
      // Update the content with the translated data
      document.querySelector("h1 span").textContent = data.header.h1.span;
      document.querySelector("h2").textContent = data.header.h2;
      if (copyButton.style.backgroundColor === "var(--success)") {
        document.querySelector("button span").textContent = data.copyButtonSuccess;
      } else {
        document.querySelector("button span").textContent = data.copyButton;
      };
      for (let i = 0; i < tabMonthLinks.length; i++) {
        tabMonthLinks[i].textContent = data.tab.months[(i + 5) % 12];
      }
    });
};

// Initially set to English Language
let isRussian = false;
const savedLanguage = localStorage.getItem("lang");

if (savedLanguage === "ru") {
  isRussian = true;
  loadTranslations("ru");
};

// Function to toggle the theme
function toggleLang() {
  if (isRussian) {
    loadTranslations("en");
    localStorage.setItem("lang", "en"); // Store the language preference as English
  } else {
    loadTranslations("ru");
    localStorage.setItem("lang", "ru"); // Store the language preference as Russian
  };

  isRussian = !isRussian; // Toggle the theme flag

  calculations();
};

const langButton = document.getElementById("lang-button");
langButton.addEventListener("click", toggleLang);