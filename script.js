var header = document.querySelector(".header");
var colorDisplay = document.querySelector(".colorDisplay");
var message = document.querySelector("#message");
var squares = document.querySelectorAll(".square");
var newColorsBtn = document.querySelector("#newColorsBtn");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");

var rightColor;
var gameOver = false;
var numSquares = 6;

init();


function setupModes() {
  easyBtn.addEventListener("click", function() {
    hardBtn.classList.remove("selected");
    this.classList.add("selected");
    numSquares = 3;
    for(var i = 3; i < 6; i++) {
      squares[i].style.backgroundColor = "#232323";
      squares[i].removeEventListener("click", squaresClick);
    }
    reset();
  });

  hardBtn.addEventListener("click", function() {
    easyBtn.classList.remove("selected");
    this.classList.add("selected");
    numSquares = 6;
    reset();
  });
}

function pickColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);

  return "rgb(" + r + ", " + g + ", " + b + ")";
}


function init() {
  // Pick the color to guess
  rightColor = pickColor();
  colorDisplay.textContent = rightColor;

  newColorsBtn.addEventListener("click", function() {
    reset();
  });

  setupModes();

  setupSquares(numSquares);
}

function setupSquares(num) {
  for(var i = 0; i < num; i++) {
    squares[i].style.backgroundColor = pickColor();
  }
  squares[Math.floor(Math.random() * num)].style.backgroundColor = rightColor;

  for(var i = 0; i < num; i++) {
    squares[i].addEventListener("click", squaresClick);
  }
}

function squaresClick() {
  if(!gameOver) {
    if(this.style.backgroundColor === rightColor) {
      message.textContent = "Correct";
      header.style.backgroundColor = rightColor;
      gameOver = true;
      newColorsBtn.textContent = "Play Again?";
    }
    else {
      message.textContent = "Try Again";
      this.style.backgroundColor = "#232323";
    }
  }
}

function reset() {
  gameOver = false;
  rightColor = pickColor();
  colorDisplay.textContent = rightColor;
  message.textContent = "";
  header.style.backgroundColor = "steelblue";
  newColorsBtn.textContent = "New Colors";
  setupSquares(numSquares);
}
