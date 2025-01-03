const movieImage = document.getElementById("movie-image");
const controlButton = document.getElementById("control-button");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
let isMoving = true;

// Toggle Image Movement
controlButton.addEventListener("click", () => toggleImageMovement());
document.addEventListener("keydown", (event) => {
  if (popup.style.display !== "block" && (event.key === " " || event.key === "Enter")) {
    toggleImageMovement();
  }
});

function toggleImageMovement() {
  if (isMoving) {
    movieImage.style.animationPlayState = "paused";
    controlButton.textContent = "Resume Movement";
    isMoving = false;
    checkImageCoverage();
  } else {
    movieImage.style.animationPlayState = "running";
    controlButton.textContent = "Stop Movement";
    isMoving = true;
    movieImage.style.left = "-100%";
  }
}

function checkImageCoverage() {
  const rect = movieImage.getBoundingClientRect();
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const imageCenterX = rect.left + rect.width / 2;
  const imageCenterY = rect.top + rect.height / 2;
  const screenCenterX = screenWidth / 2;
  const screenCenterY = screenHeight / 2;

  const tolerance = 5;
  if (
    Math.abs(imageCenterX - screenCenterX) <= tolerance &&
    Math.abs(imageCenterY - screenCenterY) <= tolerance
  ) {
    showPopup("Congratulations! Image is centered.", "success");
  } else {
    showPopup("Sorry! Try again.", "fail");
  }
}

const userData = JSON.parse(localStorage.getItem("userData")) || {
    name: "Guest",
    email: "Not provided",
    phone: "Not provided",
  };

  function showPopup(message, messageType) {
    // Prepare the user data as a formatted string
    const userInfo = `
      <div>
        <p><strong>Name:</strong> ${userData.name}</p>
        <p><strong>Email:</strong> ${userData.email}</p>
        <p><strong>Phone:</strong> ${userData.phone}</p>
      </div>
    `;
  
    // Set the popup message with the main message and user data
    popupMessage.innerHTML = `
      <span class="popup-main-message ${messageType}">${message}</span>
      ${userInfo}
    `;
  
    // Display the popup
    popup.style.display = "block";
    controlButton.disabled = true;
  
    // Hide the popup after 5 seconds
    setTimeout(() => {
      popup.style.display = "none";
      controlButton.disabled = false;
      window.location.href = "user.html";
    }, 5000);
  }
gi  
function closePopup() {
  popup.style.display = "none";
  controlButton.disabled = false;
  window.location.href = "user.html";
}
