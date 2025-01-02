const movieImage = document.getElementById("movie-image");
const controlButton = document.getElementById("control-button");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
let isMoving = true;

// Stop or restart the animation
controlButton.addEventListener("click", () => {
  if (isMoving) {
    movieImage.style.animationPlayState = 'paused'; // Pause the animation
    controlButton.textContent = "Resume Movement";
    isMoving = false;

    // Check if the image fully fits inside the screen
    const rect = movieImage.getBoundingClientRect();
    const screenWidth = window.innerWidth;

    // If the image is fully inside the viewport (without being cut off)
    if (rect.left >= 0 && rect.right <= screenWidth) {
      showPopup("Success!"); // Success popup
    } else {
      showPopup("Fail!"); // Fail popup
    }
  } else {
    movieImage.style.animationPlayState = 'running'; // Resume the animation
    controlButton.textContent = "Stop Movement";
    isMoving = true;
  }
});

// Show popup with a message and redirect after 10 seconds
function showPopup(message) {
  popupMessage.textContent = message;
  popup.style.display = 'block';

  // Hide popup and redirect after 10 seconds
  setTimeout(() => {
    popup.style.display = 'none';
    window.location.href = 'user.html'; // Redirect to user.html
  }, 10000); // 10 seconds
}

// Close popup and redirect immediately when the button is clicked
function closePopup() {
  popup.style.display = 'none';
  window.location.href = 'user.html'; // Redirect to user.html
}
