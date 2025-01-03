const movieImage = document.getElementById("movie-image");
const controlButton = document.getElementById("control-button");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
let isMoving = true;

// Stop or restart the animation using the control button
controlButton.addEventListener("click", () => {
  toggleImageMovement();
});

// Stop or restart the animation using the keyboard key (e.g., Space key)
document.addEventListener("keydown", (event) => {
  // Only allow keyboard control if the popup is not visible
  if (popup.style.display !== "block" && (event.key === " " || event.key === "Enter")) {
    toggleImageMovement();
  }
});

// Function to toggle image movement
function toggleImageMovement() {
  if (isMoving) {
    movieImage.style.animationPlayState = "paused"; // Pause the animation
    controlButton.textContent = "Resume Movement";
    isMoving = false;

    // Check if the image fully fits inside the screen
    const rect = movieImage.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("userData")) || {
      name: "Guest",
      email: "Not provided",
      phone: "Not provided",
    };

    // If the image is fully inside the viewport (without being cut off)
    if (rect.left >= 0 && rect.right <= screenWidth && rect.top >= 0 && rect.bottom <= screenHeight) {
      showPopup(
        "Success!",
        `Name: ${userData.name}`,
        `Email: ${userData.email}`,
        `Phone: ${userData.phone}`,
        "success"
      );
    } else {
      showPopup(
        "Fail!",
        `Name: ${userData.name}`,
        `Email: ${userData.email}`,
        `Phone: ${userData.phone}`,
        "fail"
      );
    }
  } else {
    movieImage.style.animationPlayState = "running"; // Resume the animation
    controlButton.textContent = "Stop Movement";
    isMoving = true;
  }
}

// Show popup with a message and redirect after 10 seconds
function showPopup(message, name, email, phone, messageType) {
  // Set the main message and user data in the popup with the appropriate class
  popupMessage.innerHTML = `<span class="popup-main-message ${messageType}">${message}</span><br><span class="popup-user-data">${name}</span><br><span class="popup-user-data">${email}</span><br><span class="popup-user-data">${phone}</span>`;
  popup.style.display = "block";

  // Disable the control button while the popup is visible
  controlButton.disabled = true;

  // Disable the keyboard press while the popup is visible
  document.removeEventListener("keydown", handleKeydown); // Remove the event listener

  // Hide popup and redirect after 10 seconds
  setTimeout(() => {
    popup.style.display = "none";
    controlButton.disabled = false; // Re-enable the control button
    document.addEventListener("keydown", handleKeydown); // Re-enable the keyboard control
    window.location.href = "user.html"; // Redirect to user.html
  }, 10000); // 10 seconds
}

// Close popup and redirect immediately when the button is clicked
function closePopup() {
  popup.style.display = "none";
  controlButton.disabled = false; // Re-enable the control button
  window.location.href = "user.html"; // Redirect to user.html
}

// Handle keyboard events for toggling image movement
function handleKeydown(event) {
  if (event.key === " " || event.key === "Enter") {
    toggleImageMovement();
  }
}
