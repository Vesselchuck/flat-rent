// Define an array of month names
const monthsArray = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

// Get the current date
const currentDate = new Date();
const currentMonth = monthsArray[currentDate.getMonth()];
const currentYear = currentDate.getFullYear();

// Find all elements with the specific classes
const tabMonthContent = document.getElementsByClassName("tab-month-content");
const tabMonthLinks = document.getElementsByClassName("tab-month-links");
const tabYearContent = document.getElementsByClassName("tab-year-content");
const tabYearLinks = document.getElementsByClassName("tab-year-links");

// Function to hide all tab content
function hideAllTabContent(tabContentElements) {
  Array.from(tabContentElements).forEach(content => {
    content.style.display = "none";
  });
};

// Function to remove "class" attribute of "active" from tab links
function removeActiveClass(tabLinksElements) {
  Array.from(tabLinksElements).forEach(link => {
    link.classList.remove("active");
  });
};

// Function to open a tab
function openTab(evt, targetId, tabContentElements, tabLinksElements) {
  hideAllTabContent(tabContentElements);
  removeActiveClass(tabLinksElements);

  document.getElementById(targetId).style.display = "block";
  evt.currentTarget.classList.add("active");
};

// Function to open a year tab
function openYear(evt, year) {
  openTab(evt, year, tabYearContent, tabYearLinks);
};

// Function to open a month tab
function openMonth(evt, month) {
  openTab(evt, month, tabMonthContent, tabMonthLinks);
};

// Convert the HTMLCollection to an array and iterate over each element
Array.from(tabYearLinks).forEach(tabYearLink => {
  // Parse the innerHTML of the element to get the year as a number
  const year = parseInt(tabYearLink.innerHTML);

  // Check if the year matches the current year
  if (year === currentYear) {
    // Set the "id" attribute to "defaultYear" for the matching element
    tabYearLink.id = "defaultYear";
    document.getElementById("defaultYear").click();
  };
});

// Define a function to calculate the starting index based on the current year
const getStartingIndex = (year) => {
  if (year === 2022) return 8;
  if (year === 2023) return 20;
  if (year === 2024) return 32;
  return -1; // Default value for other years
};

// Calculate the starting index based on the current year
const startingIndex = getStartingIndex(currentYear);

// Loop through the tabMonthLinks array
for (let i = 0; i < tabMonthLinks.length; i++) {
  // Check if we should skip this iteration based on the starting index
  if (i < startingIndex) continue;

  // Get the month name from the current tabMonthLinks element
  const month = tabMonthLinks[i].innerHTML;

  // Check if the month matches the current month
  if (month === currentMonth) {
    // Set the "id" attribute to "defaultMonth" for the matching element
    tabMonthLinks[i].setAttribute("id", "defaultMonth");
    document.getElementById("defaultMonth").click();
    break; // Stop the loop once the element is found
  };
};