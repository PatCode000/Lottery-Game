import { Ball } from "./ball.js";
import { ScoreScreen } from "./scoreScreen.js";
import { BallsScreen } from "./ballsScreen.js";
import { ButtonsComponent } from "./buttonsComponent.js";

const app = new PIXI.Application({
  width: 1100,
  height: 800,
  backgroundColor: 0xaaa555,
});

let m_totalScore = 0;

let m_numberOfBalls = 59; // max number of balls in lottery machine
let m_numberOfBallsToDraw = 6; // number of balls to be drawn/picked

let m_currentlyPickedBalls = [0, 0, 0, 0, 0, 0]; // balls currently picked
let m_currentlyDrawnBalls = [0, 0, 0, 0, 0, 0]; // balls currently drawn

let balls = [];
let m_scoreScreen;
let m_pickedBallsScreen;
let m_drawnBallsScreen;
let m_buttonsComponent;

window.onload = function () {
  document.body.appendChild(app.view);

  createObjects();

  console.log("GAME LOADED");
};

/**
 * This function creates all visible "objects"
 *
 */
function createObjects() {
  m_scoreScreen = new ScoreScreen();
  app.stage.addChild(m_scoreScreen);

  m_pickedBallsScreen = new BallsScreen();
  m_pickedBallsScreen.x = 175;
  m_pickedBallsScreen.y = 100;
  app.stage.addChild(m_pickedBallsScreen);

  m_drawnBallsScreen = new BallsScreen();
  m_drawnBallsScreen.x = 175;
  m_drawnBallsScreen.y = 275;
  app.stage.addChild(m_drawnBallsScreen);

  spawnBalls(m_numberOfBalls, 450, -50, 10, 5);

  m_buttonsComponent = new ButtonsComponent();
  m_buttonsComponent.x = -375;
  m_buttonsComponent.y = 100;
  app.stage.addChild(m_buttonsComponent);
}

/**
 * Spawn balls.
 *
 * @param {number} _numberOfBalls Set x position of entire collection.
 * @param {number} _offsetX Set x position of entire collection.
 * @param {number} _offsetY Set y position of entire collection.
 * @param {number} _numberOfColumns Number of balls in row.
 * @param {number} _spaceBetweenBalls Determine space between each ball.
 */
function spawnBalls(
  _numberOfBalls,
  _offsetX,
  _offsetY,
  _numberOfColumns = 10,
  _spaceBetweenBalls = 0
) {
  let l_rowCounter = 1;
  let l_currentBallsInRow = 0;
  for (let i = 0; i < _numberOfBalls; i++) {
    let ball = new Ball(i + 1, this);
    ball.x = _offsetX + (_spaceBetweenBalls + ball.width) * l_currentBallsInRow;
    ball.y = _offsetY + (_spaceBetweenBalls + ball.height) * l_rowCounter;

    app.stage.addChild(ball);
    balls[i] = ball;
    l_currentBallsInRow++;
    if (l_currentBallsInRow == _numberOfColumns) {
      l_rowCounter++;
      l_currentBallsInRow = 0;
    }
  }
}

/**
 * Check if player have picked all 6 numbers
 *
 */
export function isCollectionFull() {
  let numbersInCollection = 0;

  m_currentlyPickedBalls.forEach((element) => {
    if (element == 0) {
      return false;
    } else {
      numbersInCollection++;
    }
  });

  if (numbersInCollection >= m_currentlyPickedBalls.length) {
    return true;
  } else {
    return false;
  }
}

/**
 * Add ball to the picked balls collection.
 * Exported function so it can be used by balls component
 *
 * @param {number} _number Pass the number of the ball to add.
 */
export function addPickedBalls(_number) {
  for (let i = 0; i < m_currentlyPickedBalls.length; i++) {
    if (m_currentlyPickedBalls[i] == 0) {
      m_currentlyPickedBalls[i] = _number;
      m_pickedBallsScreen.setText(i, m_currentlyPickedBalls[i]);
      break;
    }
  }
}

/**
 * Remove ball from the picked balls collection.
 * Exported function so it can be used by balls component
 *
 * @param {number} _number Pass the number of the ball to remove.
 */
export function removePickedBalls(_number) {
  for (let i = 0; i < m_currentlyPickedBalls.length; i++) {
    if (m_currentlyPickedBalls[i] == _number) {
      m_currentlyPickedBalls[i] = 0;
      m_pickedBallsScreen.setText(i, "-");
      break;
    }
  }
}

/**
 * Generate 6 random picks
 *
 */
export function luckyDipButtonPressed() {
  randomPick();
}

/**
 * Call draw function, and do the checks
 *
 */
export function drawButtonPressed() {
  if (!isCollectionFull()) return;
  drawBalls();
}

/**
 * Call reset function
 *
 */
export function resetButtonPressed() {
  resetGame();
}

/**
 * Call this function to randomly pick 6 balls
 * Exported function so it can be used by balls component
 *
 */
function randomPick() {
  let l_drawIndex = 0;
  m_currentlyPickedBalls = generateRandomBalls();

  for (let i = 0; i < m_currentlyPickedBalls.length; i++) {
    m_pickedBallsScreen.setText(i, m_currentlyPickedBalls[i]);
    l_drawIndex++;
  }

  setBallsPicked();
}

/**
 * Call this function to generate drawn balls
 *
 */
function drawBalls() {
  let l_drawIndex = 0;
  m_currentlyDrawnBalls = generateRandomBalls();

  for (let i = 0; i < m_currentlyDrawnBalls.length; i++) {
    m_drawnBallsScreen.setText(i, m_currentlyDrawnBalls[i]);
    l_drawIndex++;
  }

  compareNumbers();
}

/**
 * This function can be used to generate both draw balls and lucky dip balls
 *
 * @return {number} t_generatedBalls[] return collection of randomly genrated balls.
 */
function generateRandomBalls() {
  let t_generatedBalls = [0, 0, 0, 0, 0, 0];
  let l_drawIndex = 0;

  for (let i = 0; i < m_numberOfBallsToDraw; i++) {
    t_generatedBalls[i] = generateRandomNumber(t_generatedBalls);
    l_drawIndex++;
  }

  return t_generatedBalls;
}

/**
 * Set picked balls status to picked
 *
 */
function setBallsPicked() {
  for (let i = 0; i < balls.length; i++) {
    balls[i].setBallIsUnpicked();
    for (let j = 0; j < m_currentlyPickedBalls.length; j++) {
      if (balls[i].number == m_currentlyPickedBalls[j]) {
        balls[i].setBallIsPicked();
        break;
      }
    }
  }
}

/**
 * Generate single ball number
 *
 */
function generateRandomNumber(_collection) {
  let l_randomNumber = 0;
  let l_isNumberUnique = false;

  // check if number is unique
  while (!l_isNumberUnique) {
    l_randomNumber = Math.floor(Math.random() * m_numberOfBalls + 1);
    for (let i = 0; i < _collection.length; i++) {
      if (_collection[i] == l_randomNumber) {
        l_isNumberUnique = false;
        break;
      } else {
        l_isNumberUnique = true;
      }
    }
  }

  return l_randomNumber;
}

/**
 * Compare two numbers
 *
 */
function compareNumbers() {
  let matchCounter = 0;
  for (let i = 0; i < m_currentlyPickedBalls.length; i++) {
    for (let j = 0; j < m_currentlyDrawnBalls.length; j++) {
      if (m_currentlyPickedBalls[i] == m_currentlyDrawnBalls[j]) {
        console.log(
          m_currentlyPickedBalls[i] + " match " + m_currentlyDrawnBalls[j]
        );
        matchCounter++;
        break;
      }
    }
  }

  giveResult(matchCounter);
}

/**
 * Print the results to the screen
 *
 */
function giveResult(_matchCounter) {
  let l_score;
  switch (_matchCounter) {
    case 3:
      l_score = 50;
      break;
    case 4:
      l_score = 100;
      break;
    case 5:
      l_score = 200;
      break;
    case 6:
      l_score = 500;
      break;
    default:
      l_score = 0;
  }

  m_totalScore += l_score;
  m_scoreScreen.updateMatchText(_matchCounter);
  m_scoreScreen.updateScoreText(m_totalScore);
  console.log("Your score is: " + l_score);
}

/**
 * Reset game
 *
 */
function resetGame() {
  for (let i = 0; i < m_currentlyDrawnBalls.length; i++) {
    m_currentlyPickedBalls[i] = 0;
    m_pickedBallsScreen.setText(i, "-");
    m_currentlyDrawnBalls[i] = 0;
    m_drawnBallsScreen.setText(i, "-");
    //m_drawnBallsText[i].text = "00";
  }

  for (let i = 0; i < balls.length; i++) {
    balls[i].setBallIsUnpicked();
  }

  m_totalScore = 0;
  m_scoreScreen.updateMatchText(0);
  m_scoreScreen.updateScoreText(0);
}
