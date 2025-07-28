const colors = {
  playerX: "#003cffff",
  playerO: "#50d61bff",
}

const squares = document.querySelectorAll(".square")
const statusText = document.querySelector("#statusText");
const restartButton = document.querySelector("#restartButton");
// const boardEl = document.querySelector("#board")
// const squareEls = document.querySelectorAll("div.square")
const winConditions = [
  [0, 1, 2,],
  [3, 4, 5,],
  [6, 7, 8,],
  [0, 3, 6,],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8,],
  [2, 4, 6,],
]
let options = ["", "", "", "", "", "", "", "", "",];
let currentPlayer = "x"
let running = false;

InitializeGame();

function InitializeGame() {
  squares.forEach(square => square.addEventListener("click", squareClicked)),
    restartButton.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
  console.log("game started")
};
function squareClicked() {
  const squareIndex = this.getAttribute("squareIndex")
  if (options[squareIndex] != "" || !running) {
    return;
  }
  updateSquare(this, squareIndex);
  checkWinner();
  console.log("square clicked ", squareIndex)
};
function updateSquare(square, index) {
  options[index] = currentPlayer;
  square.textContent = currentPlayer;
  console.log("updated square")
};
function changePlayer() {
  currentPlayer = (currentPlayer == "x") ? "o" : "x"
  statusText.textContent = `${currentPlayer}'s turn`
  console.log('Change Player')
};
function checkWinner() {
  let roundWon = false;
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const squareA = options[condition[0]];
    const squareB = options[condition[1]];
    const squareC = options[condition[2]];
    if (squareA == "" || squareB == "" || squareC == "") {
      continue;
    }
    if (squareA == squareB && squareB == squareC) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusText.textContent = `${currentPlayer} wins!`;
    updateScore(currentPlayer);
    running = false;
    console.log(statusText);
  }
 else if (!options.includes("")) {
  statusText.textContent = `Tie game! Try again`;
  running = false
  console.log(statusText)
}
else {
  changePlayer()
}

console.log("check winner")
};
function restartGame() {
  currentPlayer = "x"
  options = ["", "", "", "", "", "", "", "", "",];
  statusText.textContent = `${currentPlayer}'s turn`
  squares.forEach(square => square.textContent = "")
  running = true
  console.log("restart")
};

let xScore = 0;
let oScore = 0;

function updateScore(winner) {
  if (winner === "x") {
    xScore++;
    document.getElementById("xScore").textContent = xScore;
  } else if (winner === "o") {
    oScore++;
    document.getElementById("oScore").textContent = oScore;
  }
}