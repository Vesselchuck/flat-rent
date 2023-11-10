// Define CSS variables for both Dark and Light Themes
const themes = {
  dark: {
    "--primary": "rgb(23, 25, 28)",
    "--primary-alt": "rgb(16, 17, 20)",
    "--secondary": "rgb(143, 102, 163)",
    "--secondary-active": "rgb(156, 84, 156)",
    "--secondary-hover": "rgb(169, 96, 169)",
    "--success": "rgb(61, 143, 88)",
    "--tertiary": "rgb(128, 128, 128)",
    "--tertiary-active": "rgb(51, 51, 51)",
    "--tertiary-hover": "rgb(26, 26, 26)",
    "--text": "rgb(217, 217, 217)",
    "--text-alt": "rgb(217, 217, 217)",
    "--moon": "none",
    "--sun": "inline-block"
  },
  light: {}
};

// Function to apply a theme by setting or removing CSS variables
function applyTheme(theme) {
  const root = document.documentElement;

  for (const variable in themes.dark) {
    if (theme[variable]) {
      // Set the CSS variable with the theme value
      root.style.setProperty(variable, theme[variable]);
    } else {
      // Remove the CSS variable if the theme value is not defined
      root.style.removeProperty(variable);
    };
  };
};

// Initially set to Light Theme
let isDarkTheme = false;
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  isDarkTheme = true;
  applyTheme(themes.dark);
};

// Function to toggle the theme
function toggleTheme() {
  if (isDarkTheme) {
    applyTheme(themes.light);
    localStorage.setItem("theme", "light"); // Store the theme preference as light
  } else {
    applyTheme(themes.dark);
    localStorage.setItem("theme", "dark"); // Store the theme preference as dark
  };

  isDarkTheme = !isDarkTheme; // Toggle the theme flag
};

const themeButton = document.getElementById("theme-button");
themeButton.addEventListener("click", toggleTheme);