const colors = {
  playerX: "#003cffff",
  playerO: "#50d61bff",
}

const squares = document.querySelectorAll(".square")
const boardEl = document.querySelector("#board")
const squareEls = document.querySelectorAll("div.square")
const winCondition = [
  [0, 1, 2,],
  [3, 4, 5,],
  [6, 7, 8,],
  [0, 3, 6,],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8,],
  [2, 4, 6,],
]

const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let options = ["","","","","","","","","",],



squareStatus = 0
let turn = 0
let currentPlayer = "Px"
let winner = "none"

InitializeGame();
function InitializeGame(){

}
function squareClicked(){

}
function updateSquare(square, "index"){

}
function changePlayer(){

}
function checkWinner(){

}
function restartGame(){

}

let pXScore;
let pOScore;

// result

let pXResult
let pOResult

// winner condition
