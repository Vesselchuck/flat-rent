// Get a reference to the "copy-button" element
const copyButton = document.getElementById("copy-button");
let collection; // Declare a variable to store a collection of elements

// Find the tabMonthContent with the inline style "display: block;"
copyButton.addEventListener("click", () => {
  // Find the first element with the style "display: block;"
  const elementWithDisplayBlock = Array.from(tabMonthContent).find(element => element.style.display === "block");
  // Query all <p> elements within the found element
  collection = elementWithDisplayBlock.querySelectorAll("p");

  // Mark the current localization
  if (isRussian) {
    currentLanguage = "ru";
  } else {
    currentLanguage = "en";
  };

  // Update the copy button's appearance to indicate successful copying
  fetch(`lang/${currentLanguage}.json`)
    .then(response => response.json())
    .then(data => {
      const electricity = data.container.electricity;
      const coldWater = data.container.coldWater;
      const hotWater = data.container.hotWater;
      const total = data.container.total;

      // Create a text string to copy to the clipboard
      const outputToCopy = `${electricity}\n${collection[0].innerText}\n\n${coldWater}\n${collection[1].innerText}\n\n${hotWater}\n${collection[2].innerText}\n\n${total}\n${collection[3].innerText}`;

      // Copy the generated text to the clipboard
      navigator.clipboard.writeText(outputToCopy);

      copyButton.innerHTML = `<i class="fa-solid fa-clipboard-check" style="padding-right: 0.5rem"></i><span>${data.copyButtonSuccess}</span>`;
    });

  copyButton.style.backgroundColor = "var(--success)";
  copyButton.style.cursor = "default";
});

// Function to reset styles of an element
function resetStyles(element) {
  fetch(`lang/${currentLanguage}.json`)
    .then(response => response.json())
    .then(data => {
      // Update the content with the translated data
      element.innerHTML = `<i class="fa-solid fa-clipboard-list" style="padding-right: 0.5rem"></i><span>${data.copyButton}</span>`;
    });

  element.style.backgroundColor = "";
  element.style.cursor = "";
};

// Function to add click event listeners to a HTMLCollection of elements
function addClickListenersToElements(elements) {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    // Add a click event listener to each element
    element.addEventListener("click", () => {
      // Reset styles of the copyButton
      resetStyles(copyButton);
      // Show or hide the copyButton based on the condition
      copyButton.style.display = elements[0]?.innerHTML !== "June" && elements[0]?.innerHTML !== "Июнь" ? "none" : "";
    });
  };
};

// Add click event listeners to elements in the tabMonthLinks and tabYearLinks HTMLCollections
addClickListenersToElements(tabMonthLinks);
addClickListenersToElements(tabYearLinks);