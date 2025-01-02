// Get references to game elements
const kojo = document.getElementById("kojo");
const scoreBoard = document.getElementById("score-board");

// Initialize score
let score = 0;

// Function to move Kojo randomly
function moveKojo() {
  const containerWidth = window.innerWidth;
  const containerHeight = window.innerHeight;

  // Random position within the game container
  const x = Math.random() * (containerWidth - kojo.offsetWidth);
  const y = Math.random() * (containerHeight - kojo.offsetHeight);

  // Move Kojo using GSAP
  gsap.to(kojo, { x, y, duration: 0.8, ease: "power1.inOut" });
}

// Function to update score
function updateScore() {
  score++;
  scoreBoard.textContent = `Score: ${score}`;
}

// Event listener for catching Kojo
kojo.addEventListener("click", () => {
  updateScore();
  moveKojo();
});

// Move Kojo every second
setInterval(moveKojo, 1000);

// Initial movement
moveKojo();
