const colors = {
  playerX: "#003cff",
  playerO: "#50d61b",
};
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
const resetScoresButton = document.getElementById("resetScoresButton");

resetScoresButton.addEventListener("click", () => {
  xScore = 0;
  oScore = 0;
  document.getElementById("xScore").textContent = xScore;
  document.getElementById("oScore").textContent = oScore;
  updateTrophy(null);
  resetScoresButton.style.display = "none";
  restartGame();
  statusText.textContent = `${currentPlayer.toUpperCase()}'s turn`;
});

let trophyHolder = null;
let options = ["", "", "", "", "", "", "", "", "",];
let currentPlayer = "x"
let running = false;
let timerInterval = null;
let timerSeconds = 0;
let timerRunning = false;
let xScore = 0;
let oScore = 0;

const timerEl = document.getElementById("timer");
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
function startTimer() {
  if (timerRunning) return;
  timerRunning = true;
  timerInterval = setInterval(() => {
    timerSeconds++;
    timerEl.textContent = formatTime(timerSeconds);
  }, 1000);
}
function stopTimer() {
  timerRunning = false;
  clearInterval(timerInterval);
  timerInterval = null;
}
function resetTimer() {
  stopTimer();
  timerSeconds = 0;
  timerEl.textContent = formatTime(timerSeconds);
}
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
InitializeGame();
function InitializeGame() {
  restartButton.disabled = true;
  restartButton.classList.add("disabled");
  squares.forEach(square => square.addEventListener("click", squareClicked)),
    restartButton.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
  // console.log("game started")
};
function squareClicked() {
  if (!timerRunning) startTimer();
  const squareIndex = this.getAttribute("squareIndex");
  if (options[squareIndex] != "" || !running) {
    return;
  }
  updateSquare(this, squareIndex);
  checkWinner();
  console.log("square clicked ", squareIndex);
};
function updateSquare(square, index) {
  options[index] = currentPlayer;
  square.textContent = currentPlayer;
  if (currentPlayer === "x") {
    square.style.color = colors.playerX;
  } else {
    square.style.color = colors.playerO;
  }
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
    updateScore(currentPlayer);
    running = false;
    stopTimer();
    restartButton.disabled = false;
    restartButton.classList.remove("disabled");
  } else if (!options.includes("")) {
    statusText.textContent = `Tie game! Try again`;
    running = false;
    stopTimer();
    restartButton.disabled = false;
    restartButton.classList.remove("disabled");
  } else {
    changePlayer();
  }
  console.log("check winner")
};
function restartGame() {
  currentPlayer = "x";
  options = ["", "", "", "", "", "", "", "", "",];
  statusText.textContent = `${currentPlayer}'s turn`;
  squares.forEach(square => square.textContent = "");
  running = true;
  resetTimer();
  restartButton.disabled = true;
  restartButton.classList.add("disabled");
  // console.log("restart");
};
function updateScore(winner) {
  const xScoreEl = document.getElementById("xScore");
  const oScoreEl = document.getElementById("oScore");

  xScoreEl.style.color = "#003cff";
  oScoreEl.style.color = "#50d61b";

  if (winner === "x") {
    xScore++;
    xScoreEl.textContent = xScore;
    xScoreEl.style.color = "gold";
  } else if (winner === "o") {
    oScore++;
    oScoreEl.textContent = oScore;
    oScoreEl.style.color = "gold";
  }

  // Only move trophy if *other* player hits 10 wins AND it's not already their trophy
  if (winner === "x" && xScore >= 10 && trophyHolder !== "x") {
    trophyHolder = "x";
    updateTrophy(trophyHolder);
    statusText.textContent = `10 wins to X, WELL DONE! Are you sure you want to keep playing with this idiot?`;
    document.getElementById("resetScoresButton").style.display = "block";
  } else if (winner === "o" && oScore >= 10 && trophyHolder !== "o") {
    trophyHolder = "o";
    updateTrophy(trophyHolder);
    statusText.textContent = `10 wins to O, WELL DONE! Are you sure you want to keep playing with this idiot?`;
    document.getElementById("resetScoresButton").style.display = "block";
  } else {
    updateTrophy(null); // keep current trophy if no new 10 wins
  }
}

function updateTrophy(winner) {
  const xTitle = document.getElementById("x");
  const oTitle = document.getElementById("o");

  // Reset titles (no trophies)
  xTitle.textContent = "X";
  oTitle.textContent = "O";

  if (trophyHolder === "x") {
    xTitle.textContent = "X 🏆";
  } else if (trophyHolder === "o") {
    oTitle.textContent = "O 🏆";
  }
}
