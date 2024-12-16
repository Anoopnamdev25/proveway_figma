// document.addEventListener("DOMContentLoaded", () => {
//     const radioButtons = document.querySelectorAll('input[name="unit"]');
//     const footer = document.querySelector(".footer span strong");
  
//     radioButtons.forEach((radio) => {
//       radio.addEventListener("change", () => {
//         // Update Total Price in Footer
//         if (radio.id === "unit-1") {
//           footer.textContent = "$10.00";
//         } else if (radio.id === "unit-2") {
//           footer.textContent = "$18.00";
//         } else if (radio.id === "unit-3") {
//           footer.textContent = "$24.00";
//         }
//       });
//     });
//   });
  

document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".box");
  const totalElement = document.querySelector(".footer strong");
  let currentTotal = 0;

  boxes.forEach(box => {
    const radioInput = box.querySelector("input[type='radio']");
    const priceElement = box.querySelector(".price");

    radioInput.addEventListener("change", () => {
      // Toggle open/close for boxes
      if (box.classList.contains("open")) {
        box.classList.remove("open");
        currentTotal = 0; // Reset total if deselected
      } else {
        // Close all other boxes
        boxes.forEach(b => {
          b.classList.remove("open");
          b.querySelector("input[type='radio']").checked = false; // Uncheck radio inputs
        });

        // Open the selected box
        box.classList.add("open");
        radioInput.checked = true; // Ensure the radio is selected

        // Update the total price
        const price = parseFloat(priceElement.textContent.replace("$", ""));
        currentTotal = price;
      }

      updateTotal();
    });

    // Dynamically generate options if not already present
    if (!box.querySelector(".options")) {
      const optionsContainer = document.createElement("div");
      optionsContainer.classList.add("options");

      for (let i = 1; i <= parseInt(box.id.split("-")[1]); i++) {
        const optionDiv = document.createElement("div");
        optionDiv.classList.add("option");

        const label = document.createElement("label");
        label.textContent = `#${i}:`;

        const sizeSelect = document.createElement("select");
        ["Size", "S", "M", "L"].forEach(size => {
          const option = document.createElement("option");
          option.textContent = size;
          sizeSelect.appendChild(option);
        });

        const colorSelect = document.createElement("select");
        ["Color", "Black", "Blue", "Red"].forEach(color => {
          const option = document.createElement("option");
          option.textContent = color;
          colorSelect.appendChild(option);
        });

        optionDiv.appendChild(label);
        optionDiv.appendChild(sizeSelect);
        optionDiv.appendChild(colorSelect);

        optionsContainer.appendChild(optionDiv);
      }

      box.querySelector("label").appendChild(optionsContainer);
    }
  });

  // Function to update the total price
  function updateTotal() {
    totalElement.textContent = `$${currentTotal.toFixed(2)}`;
  }
});
