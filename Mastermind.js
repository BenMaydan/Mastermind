// "use strict";
// Constants
const WIDTH = 4;
const HEIGHT = 10;
var DEBUG = false;
const divisionCircleSize = 6;
const divisionResizeWidth = 3;
const additionResizeWidth = 0;
const mousePressedTrueReturn = true;
const mousePressedFalseReturn = false;

// Reusable variables
var i = 0;
var ii = 0;

// State variables
var hours = 0;
var minutes = 0;
var seconds = 0;
var finalTime;
var gameWon = false;
var gameLost = false;
const PVP = "pvp";
const PVC = "pvc";
var mode;

// Board logic variables
const NONE = -1;
var boardGuessY = 0;
var boardCircleX = 0;
var boardCircles = [];
var boardCheck = [];
var code = new Array(WIDTH);

// Color variables
var colors = new Array(6);
var BLACK_PEG;
var WHITE_PEG;
var BOARD_COLOR;
var CIRCLE_DEFAULT_COLOR;
var CHECK_COLOR;
var CHECK_CIRCLE_COLOR;
var COLOR_SETTING_COLOR;

// Board drawing variables
var boardX;
var boardY;
var boardHeight;
var boardWidth;
var boardCircleDia;
var boardCircleRad;
var boardDistBetweenCircles;
var boardDistBetweenRows;
var boardRatio;

// Check drawing variables
var checkWidth;
var checkHeight;
var checkX;
var checkY;
var checkBoxWidth;
var checkBoxHeight

// Settings board variables
var setupBoardWidth;
var setupBoardHeight;
var colorSettingWidth;
var colorSettingHeight;
var colorSettingCircleDia;
var colorSettingCircleRad;
var colorSettingDistBetweenCircles;

// Button variables
var checkGuessTextSize;
var deleteGuessTextSize;
var newGameTextSize;
var gameTimeTextSize = 12;
var checkGuessWidth;
var checkGuessHeight;
var checkGuessX;
var checkGuessY;
var deleteGuessWidth;
var deleteGuessHeight;
var deleteGuessX;
var deleteGuessY;
var newGameWidth;
var newGameHeight;
var newGameX;
var newGameY;
var gameWonWidth;
var gameWonHeight;
var gameWonX;
var gameWonY;

// Padding
const checkPegHorizontalPadding = 10;
const checkPegVerticalPadding = 10;
const checkHorizontalPadding = 10;
var boardHorizontalPadding;
var boardVerticalPadding;
const colorSettingHorizontalPadding = 15;
const colorSettingVerticalPadding = 15;
const checkGuessHorizontalPadding = 15;
const checkGuessVerticalPadding = 15;
const deleteGuessHorizontalPadding = 15;
const deleteGuessVerticalPadding = 15;
const newGameHorizontalPadding = 15;
const newGameVerticalPadding = 15;
const gameWonHorizontalPadding = 15;
const gameWonVerticalPadding = 15;
const numButtons = 4;
const setupTotalVerticalPadding = colorSettingVerticalPadding + checkGuessVerticalPadding + deleteGuessVerticalPadding + newGameVerticalPadding * 2;






function setDrawingVariables() {
  boardHeight = height;
  boardWidth = width / 3;
  boardRatio = boardHeight / boardWidth;
  boardX = (width - boardWidth) / 4 * 3;
  boardY = 0;
  // check init start
  checkWidth = (boardWidth - checkHorizontalPadding) / 3;
  checkHeight = boardHeight / HEIGHT;
  checkX = boardX + checkHorizontalPadding + checkWidth * 2;
  checkBoxWidth = checkWidth/2-checkPegHorizontalPadding*2;
  checkBoxHeight = checkHeight/2 - checkPegVerticalPadding*2;
  // check init end
  boardCircleDia = (boardWidth - checkWidth) / divisionCircleSize;
  boardCircleRad = int(str(boardCircleDia)) / 2;

  boardHorizontalPadding = 5 + boardCircleRad;
  boardVerticalPadding = checkHeight / 2;
  boardDistBetweenCircles = (boardWidth - checkWidth - boardHorizontalPadding * 2) / WIDTH;
  boardDistBetweenRows = checkHeight;

  setupBoardWidth = boardX - 50;
  // setupBoardHeight = height / 3 * 2;
  setupBoardHeight = height/5*4;
  colorSettingWidth = setupBoardWidth - colorSettingHorizontalPadding * 2;
  colorSettingHeight = (setupBoardHeight - setupTotalVerticalPadding) / numButtons;
  colorSettingCircleDia = colorSettingWidth / colors.length;
  if (colorSettingCircleDia > colorSettingHeight)
    colorSettingCircleDia = colorSettingHeight;
  checkGuessWidth = setupBoardWidth - checkGuessHorizontalPadding * 2;
  checkGuessHeight = (setupBoardHeight - setupTotalVerticalPadding) / numButtons;
  newGameWidth = setupBoardWidth - checkGuessHorizontalPadding * 2;
  newGameHeight = (setupBoardHeight - setupTotalVerticalPadding) / numButtons;
  colorSettingCircleRad = colorSettingCircleDia / 2;
  checkGuessX = checkGuessHorizontalPadding;
  checkGuessY = colorSettingVerticalPadding + colorSettingHeight + checkGuessVerticalPadding;
  deleteGuessWidth = setupBoardWidth - deleteGuessHorizontalPadding * 2;
  deleteGuessHeight = (setupBoardHeight - setupTotalVerticalPadding) / numButtons;
  deleteGuessX = deleteGuessHorizontalPadding;
  deleteGuessY = checkGuessY + checkGuessHeight + deleteGuessVerticalPadding;
  newGameX = newGameHorizontalPadding;
  newGameY = deleteGuessY + deleteGuessHeight + newGameVerticalPadding;
  gameWonWidth = setupBoardWidth - gameWonHorizontalPadding * 2;
  gameWonHeight = height-setupBoardHeight - gameWonVerticalPadding * 2;
  gameWonX = gameWonHorizontalPadding;
  gameWonY = setupBoardHeight + gameWonVerticalPadding * 2;
  checkGuessTextSize = autoTextSize("Check Guess", checkGuessWidth);
  deleteGuessTextSize = autoTextSize("Delete Guess", deleteGuessWidth);
  newGameTextSize = autoTextSize("New Game", newGameWidth);
}

function resetBoard() {
  boardCircles = [];
  boardCheck = [];
  for (i = 0; i < HEIGHT; i++) {
    boardCircles.push([]);
    boardCheck.push([]);
    for (ii = 0; ii < WIDTH; ii++) {
      boardCircles[i].push(NONE);
      boardCheck[i].push(NONE);
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colors[0] = color(255, 84, 84);
  colors[1] = color(84, 201, 255);
  colors[2] = color(242, 245, 76);
  colors[3] = color(106, 242, 75);
  colors[4] = color(255);
  colors[5] = color(0);
  BLACK_PEG = color(0);
  WHITE_PEG = color(255);
  BOARD_COLOR = color(222, 171, 69);
  CIRCLE_DEFAULT_COLOR = color(115, 113, 104);
  CHECK_COLOR = color(115, 113, 104);
  COLOR_SETTING_COLOR = color(173);
  for (i = 0; i < WIDTH; i++)
    code[i] = int(random(0, colors.length));
  // Use this color code for debugging pegs
  // code = [4, 4, 5, 4];
  
  setInterval(increaseSeconds, 1000);

  resetBoard();
  setDrawingVariables();
  textAlign(CENTER, CENTER);
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setDrawingVariables();
}






function mouseMoved() {
  cursor(ARROW);
  for (i = 0; i < colors.length; i++)
    if (dist(colorSettingHorizontalPadding + colorSettingCircleRad + i * colorSettingCircleDia, colorSettingVerticalPadding + colorSettingHeight / 2, mouseX, mouseY) < colorSettingCircleRad) {
      cursor(HAND);
      return;
    }
  if ((mouseX > checkGuessX && mouseX < checkGuessX + checkGuessWidth && mouseY > checkGuessY && mouseY < checkGuessY + checkGuessHeight) || (mouseX > deleteGuessX && mouseX < deleteGuessX + deleteGuessWidth && mouseY > deleteGuessY && mouseY < deleteGuessY + deleteGuessHeight) || (mouseX > newGameX && mouseX < newGameX + newGameWidth && mouseY > newGameY && mouseY < newGameY + newGameHeight))
    cursor(HAND);
}

function mousePressed() {
  if (!gameWon && !gameLost) {
    for (i = 0; i < colors.length; i++)
      if (dist(colorSettingHorizontalPadding + colorSettingCircleRad + i * colorSettingCircleDia, colorSettingVerticalPadding + colorSettingHeight / 2, mouseX, mouseY) < colorSettingCircleRad) {
        boardCircles[boardGuessY][boardCircleX++] = i;
        return mousePressedTrueReturn;
      }

    if (mouseX > checkGuessX && mouseX < checkGuessX + checkGuessWidth && mouseY > checkGuessY && mouseY < checkGuessY + checkGuessHeight) {
      for (ii = 0; ii < WIDTH; ii++)
        if (boardCircles[boardGuessY][ii] == NONE)
          return mousePressedTrueReturn;
      compareGuess();
      checkGameWinStatus();
      if (boardGuessY < HEIGHT-1)
        boardGuessY++;
      boardCircleX = 0;
      return mousePressedTrueReturn;
    }
    if (boardCircleX >= 0 && mouseX > deleteGuessX && mouseX < deleteGuessX + deleteGuessWidth && mouseY > deleteGuessY && mouseY < deleteGuessY + deleteGuessHeight) {
      if (boardCircleX > 0)
        boardCircleX--;
      boardCircles[boardGuessY][boardCircleX] = NONE;
    }
  }

  if (mouseX > newGameX && mouseX < newGameX + newGameWidth && mouseY > newGameY && mouseY < newGameY + newGameHeight) {
    gameWon = false;
    gameLost = false;
    resetBoard();
    boardGuessY = 0;
    boardCircleX = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
    for (i = 0; i < WIDTH; i++)
      code[i] = int(random(0, colors.length));
  }
}

function keyTyped() {
  if (key == 'd')
    DEBUG = !DEBUG;
}






function draw() {
  background(255);

  // black bar
  fill(0);
  rect(0, boardY, boardX, height - boardY);
  rect(boardX + boardWidth, boardY, width - boardX, height - boardY);

  // draw generated code if debugging is on
  if (DEBUG) {
    let dia = (width - boardX - boardWidth) / 4;
    let x = boardX + boardWidth;
    let y = 0;
    fill(100);
    rect(boardX + boardWidth, 0, width - boardX - boardWidth, dia);
    for (ii = 0; ii < code.length; ii++) {
      fill(colors[code[ii]]);
      circle(x + dia / 2 + dia * ii, y + dia / 2, dia);
    }
  }

  // Draw text to signify that the player won the game
  if (gameWon || gameLost) {
    setupColorForBoard();
    rect(0, gameWonY - gameWonVerticalPadding, setupBoardWidth, height / 5);
    fill(255);
    rect(gameWonX, gameWonY, gameWonWidth, gameWonHeight);
    fill(0);
    if (gameWon) {
      textSize(gameTimeTextSize);
      text("You won in " + finalTime + "!", gameWonX + gameWonWidth / 2, gameWonY + gameWonHeight / 2);
    } else if (gameLost) {
      textSize(gameTimeTextSize);
      text("You lost in " + finalTime + "!", gameWonX + gameWonWidth / 2, gameWonY + gameWonHeight / 2);
    }
  }

  // Top left setting bar
  setupColorForBoard();
  rect(0, 0, setupBoardWidth, setupBoardHeight);
  setupColorForColorSetting();
  rect(colorSettingHorizontalPadding, colorSettingVerticalPadding, colorSettingWidth, colorSettingHeight)
  for (i = 0; i < colors.length; i++) {
    fill(colors[i]);
    circle(colorSettingHorizontalPadding + colorSettingCircleRad + i * colorSettingCircleDia, colorSettingVerticalPadding + colorSettingHeight / 2, colorSettingCircleDia);
  }
  fill(255);
  rect(checkGuessX, checkGuessY, checkGuessWidth, checkGuessHeight);
  rect(deleteGuessX, deleteGuessY, deleteGuessWidth, deleteGuessHeight);
  rect(newGameX, newGameY, newGameWidth, newGameHeight);
  fill(0);
  textSize(checkGuessTextSize);
  text("Check Guess", checkGuessX + checkGuessWidth / 2, checkGuessY + checkGuessHeight / 2);
  textSize(deleteGuessTextSize);
  text("Delete Guess", deleteGuessX + deleteGuessWidth / 2, deleteGuessY + deleteGuessHeight / 2);
  textSize(newGameTextSize);
  text("New Game", newGameX + newGameWidth / 2, newGameY + newGameHeight / 2);

  // background board
  setupColorForBoard();
  rect(boardX, boardY, boardWidth, boardHeight);

  for (i = 0; i < HEIGHT; i++) {
    setupColorForCheckRect();
    rect(checkX, i * checkHeight, checkWidth, checkHeight);
    setupColorForCheckCircle(boardCheck[i][0]);
    rect(checkX+checkPegHorizontalPadding, i*checkHeight+checkPegVerticalPadding, checkBoxWidth, checkBoxHeight); // upper left quadrant
    setupColorForCheckCircle(boardCheck[i][1]);
    rect(checkX+checkWidth/2+checkPegHorizontalPadding, i*checkHeight+checkPegVerticalPadding, checkBoxWidth, checkBoxHeight); // upper right quadrant
    setupColorForCheckCircle(boardCheck[i][2]);
    rect(checkX+checkPegHorizontalPadding, i*checkHeight+checkHeight/2+checkPegVerticalPadding, checkBoxWidth, checkBoxHeight); // bottom left quadrant
    setupColorForCheckCircle(boardCheck[i][3]);
    rect(checkX+checkWidth/2+checkPegHorizontalPadding, i*checkHeight+checkHeight/2+checkPegVerticalPadding, checkBoxWidth, checkBoxHeight); // bottom right quadrant
    setupColorForCheckLines();
    line(checkX, i * checkHeight + checkHeight, checkX, i * checkHeight);
    line(checkX, i * checkHeight, checkX + checkWidth, i * checkHeight);
    line(checkX + checkWidth, i * checkHeight, checkX + checkWidth, i * checkHeight + checkHeight);
    for (ii = 0; ii < WIDTH; ii++) {
      if (boardCircles[i][ii] == NONE)
        setupColorForDefaultCircle();
      else
        setupColorForCircle(colors[boardCircles[i][ii]]);
      circle(boardX + boardHorizontalPadding + ii * boardDistBetweenCircles, boardY + boardVerticalPadding + i * boardDistBetweenRows, boardCircleDia);
    }
  }
}




















function increaseSeconds() {
  seconds++;
  if (seconds === 60) {
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
    seconds = 0;
  }
}
function printTime() {
  let s = "";
  if (hours > 0)
    s += hours + "hours, ";
  if (minutes > 0)
    s += minutes + "minutes, ";
  if (seconds > 0)
    s += seconds + " seconds";
  return s;
}



// Guess checker function
function compareGuess() {
  let checkX = 0;
  let boardColorsUnused = [];
  let codeColorsUnused = [];
  // black pegs
  for (let cg = 0; cg < WIDTH; cg++) {
    if (boardCircles[boardGuessY][cg] === code[cg])
      boardCheck[boardGuessY][checkX++] = BLACK_PEG;
    else {
      boardColorsUnused.push(boardCircles[boardGuessY][cg]);
      codeColorsUnused.push(code[cg]);
    }
  }
  // white pegs
  for (let bcui = 0; bcui < boardColorsUnused.length; bcui++) {
    for (let ccui = 0; ccui < codeColorsUnused.length; ccui++) {
      if (boardColorsUnused[bcui] === codeColorsUnused[ccui]) {
        boardCheck[boardGuessY][checkX++] = WHITE_PEG;
        boardColorsUnused.splice(bcui, 1);
        codeColorsUnused.splice(ccui, 1);
        bcui = -1;
      }
    }
  }
}



function checkGameWinStatus() {
  // check if game has been won
  let won = true;
  for (ii = 0; ii < WIDTH; ii++) {
    if (boardCheck[boardGuessY][ii] == WHITE_PEG || boardCheck[boardGuessY][ii] == NONE) {
      won = false;
      break;
    }
  }
  gameWon = won;
  // check if game has been lost
  if (!gameWon && boardGuessY == HEIGHT-1) {
    let lost = false;
    for (ii = 0; ii < WIDTH; ii++)
      if (boardCheck[boardGuessY][ii] == WHITE_PEG || boardCheck[boardGuessY][ii] == NONE)
        lost = true;
    gameLost = lost;
  }
  if (gameWon) {
    finalTime = printTime();
    gameTimeTextSize = autoTextSize("You won in " + finalTime + "!", gameWonWidth-gameWonHorizontalPadding*2);
  }
  if (gameWon) {
    finalTime = printTime();
    gameTimeTextSize = autoTextSize("You lost in " + finalTime + "!", gameWonWidth-gameWonHorizontalPadding*2);
  }
}


// helpful fill functions
function setupColorForBoard() {
  noStroke();
  fill(BOARD_COLOR);
}

function setupColorForDefaultCircle() {
  noStroke();
  fill(CIRCLE_DEFAULT_COLOR);
}

function setupColorForCircle(c) {
  noStroke();
  fill(c)
}

function setupColorForCheckRect() {
  noStroke();
  fill(CHECK_COLOR);
}

function setupColorForCheckLines() {
  stroke(0);
}

function setupColorForCheckCircle(c) {
  noStroke();
  if (c == NONE)
    fill(CHECK_COLOR);
  else
    fill(c);
}

function setupColorForColorSetting() {
  noStroke();
  fill(COLOR_SETTING_COLOR);
}



// helpful text functions
function autoTextSize(txt, rectWidth) {
  let txtSize = int(str(width));
  textSize(txtSize);
  while (textWidth(txt) > rectWidth) {
    txtSize -= 0.5;
    textSize(txtSize);
  }
  return txtSize;
}


document.oncontextmenu = function() {
  return false;
}

function pprint(name, array) {
  let s = "[";
  for (ii = 0; ii < array.length; ii++) {
    if (ii < array.length - 1)
      s = s + array[ii] + ", ";
    else
      s = s + array[ii] + "]";
  }
  print("pprint " + name + ":" + s);
}
