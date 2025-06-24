// 1) Define required constants
//colours for players & empty squares
const colors = {
  empty: "#ffffff",
  playerX: "#ff0000",
  playerO: "#3A6152",
}

//win scenarios linkrf yo dwustr numbers
const win = [
  [0, 1, 2,],
  [3, 4, 5,],
  [6, 7, 8,],
  [0, 3, 6,],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8,],
  [2, 4, 6,],
]

//initial state of the board
const board = [0, 0, 0, 0, 0, 0, 0, 0, 0]


// 2) Define required variables used to track the state of the game
squareStatus = 0
let turn = 0
let currentPlayer = "PX"
let winner = "none"
// 3) Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant.
const boardEl = document.querySelector("#board")
const squareEls = document.querySelectorAll("div.square")
// 4) Upon loading the app should:
//   4.1) Initialize the state variables
//   4.2) Render those values to the page
//   4.3) Wait for the user to click a square

// 5) Handle a player clicking a square

// 6) Handle a player clicking the replay button

// Apps state variables
// p1 score, p2 score

let pXScore;
let pOScore;

// result

let pXResult
let pOResult

// winner condition
