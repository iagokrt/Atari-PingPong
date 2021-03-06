var canvas;
var canvasContext;

var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 3;

var showingWinScreen = false;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_WEIGHT = 10;

function calculateMousePos(e) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = e.clientX - rect.left - root.scrollLeft;
  var mouseY = e.clientY - rect.top - root.scrollTop;

  return {
    x: mouseX,
    y: mouseY
  };
}

function handleMouseClick(e) {
  if (showingWinScreen) {
    player1Score = 0;
    player2Score = 0;
    showingWinScreen = false;
  }
}

window.onload = function() {
  canvas = document.getElementById("gameCanvas");

  canvasContext = canvas.getContext("2d");

  var fps = 30;
  setInterval(function() {
    moveEverything();
    drawEverything();
  }, 1000 / fps);

  canvas.addEventListener("mousedown", handleMouseClick);

  canvas.addEventListener("mousemove", function(e) {
    var mousePos = calculateMousePos(e);
    paddle1Y = mousePos.y - PADDLE_HEIGHT / 2;
  });
};

function ballReset() {
  if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
    showingWinScreen = true;
  }

  ballSpeedX = -ballSpeedX;

  ballX = canvas.width / 2;
  ballY - canvas.height / 2;
}

function computerMovement() {
  var paddle2YCenter = paddle2Y + PADDLE_HEIGHT / 2;

  if (paddle2YCenter < ballY - 35) {
    paddle2Y += 6;
  } else if (paddle2YCenter > ballY + 35) {
    paddle2Y -= 6;
  }
}

function moveEverything() {
  if (showingWinScreen) {
    return;
  }

  computerMovement();

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX < 0) {
    if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;

      var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);

      //more consistency, without this the ball would went crazy!
      ballSpeedY = deltaY * 0.4;
    } else {
      player2Score++;

      ballReset();
    }
  }
  if (ballX > canvas.width) {
    if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;

      var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);

      //more consistency, without this the ball would went crazy!
      ballSpeedY = deltaY * 0.35;
    } else {
      player1Score++;
      ballReset();
    }
  }

  if (ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }
  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
}

function drawNet() {
  for (var i = 0; i < canvas.height; i += 40) {
    colorRect(canvas.width / 2 - 1, i, 2, 20, "grey");
  }
}

function drawEverything() {
  colorRect(0, 0, canvas.width, canvas.height, "black");

  if (showingWinScreen) {
    canvasContext.fillStyle = "white";

    if (player1Score >= WINNING_SCORE) {
      canvasContext.fillText("Left player won!", 350, canvas.width / 2.5);
    } else if (player2Score >= WINNING_SCORE) {
      canvasContext.fillText("Right player won!", 350, canvas.width / 2.5);
    }
    canvasContext.fillText("Click to Continue", 350, 500);

    return;
  }

  drawNet();

  //paddle left
  colorRect(0, paddle1Y, PADDLE_WEIGHT, PADDLE_HEIGHT, "white");

  //paddle right
  colorRect(
    canvas.width - PADDLE_WEIGHT,
    paddle2Y,
    PADDLE_WEIGHT,
    PADDLE_HEIGHT,
    "white"
  );

  //game ball
  colorCircle(ballX, ballY, 10, "white");

  //score

  canvasContext.fillText("score", canvas.width / 2, 30);
  canvasContext.fillText(player1Score, 300, 50);
  canvasContext.fillText(player2Score, canvas.width - 300, 50);
}

function colorCircle(centerX, centerY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}
