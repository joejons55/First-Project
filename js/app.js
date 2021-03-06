// I will connect a board with cells with js file
let main = document.querySelector(".main")//Im going to use it later
// Add score to this game
const scroeEle = document.getElementById("score");
const levelEle = document.getElementById("level");
// Add button to start the game and to reset
const startBtn = document.querySelector('.s')
const pauseBtn = document.querySelector('.p') 
// This will pops up when the player will loose a game
const gameOver = document.querySelector(".game-over")

// Game Speed
// let gameSpeed = 500
// Array with arrays that will store differen values and single array
// let newLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
let gameBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],   
]


//Simply creating player score and levels, timer
let score = 0;
let gameTimer;
let currentLevel = 1;
let paused = true;
let levels = {
  1: {
    scorePerLine: 10,
    speed: 600,
    nextLevelScore: 200,
  },
  2: {
    scorePerLine: 15,
    speed: 400,
    nextLevelScore: 300,
  },
  3: {
    scorePerLine: 20,
    speed: 300,
    nextLevelScore: 400,
  },
  4: {
    scorePerLine: 30,
    speed: 200,
    nextLevelScore: Infinity,
  },
};

// Creating all figures for game
let figures = {
    O: [
      [1, 1],
      [1, 1],
    ],
    I: [
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    S: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    Z: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    J: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    L: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    T: [
      [1, 1, 1], 
      [0, 1, 0], 
      [0, 0, 0], 
    ],
  };

  let mainFigure = getNewFigure(); //will switch first figure with new rendomly choosen after it reach the bottom 

//Need to create a function that will check each array(y) in array(gameBoard) and each element(x) in this all arras(y). After check it will return
function draw() {
    let mainInnerHTML = ``
    for (let y = 0; y < gameBoard.length; y++){
        for (let x = 0; x < gameBoard[y].length; x++){
            if (gameBoard[y][x] === 1){
                mainInnerHTML += `<div class="cell movingCell"></div>`
            } else if (gameBoard[y][x] === 2) {
                mainInnerHTML += `<div class="cell fixedCell"></div>`
            } else {
                mainInnerHTML += `<div class="cell"></div>`
            }
        }
    }
    main.innerHTML = mainInnerHTML
}


//Function that changing figure value form 1 to 0 and will remove figure
function removePrevFigure() {
    for (let y = 0; y < gameBoard.length; y++) {
        for (let x = 0;x < gameBoard[y].length;x++){
            if (gameBoard[y][x] === 1) {
                gameBoard[y][x] = 0
            }
        }
    }
}

// Need to create a function that will update active figure value from 1 to 0. So when figure changig it location it will not stay on the previous 
function updateActiveFigure() {
    removePrevFigure()
    for (let y = 0; y < mainFigure.shape.length; y++) {
        for (let x = 0; x < mainFigure.shape[y].length; x++) {
            if (mainFigure.shape[y][x] === 1) {
                gameBoard[mainFigure.y + y][mainFigure.x + x] = 
                mainFigure.shape[y][x]
            }
        }
    }
}

// Rotation function that doing rotation around mainFigure
function rotation() {
    const prevTetroState = mainFigure.shape;
    mainFigure.shape = mainFigure.shape[0].map((val, index) =>
      mainFigure.shape.map((row) => row[index]).reverse()
    );
    if (hasCollision()) {
      mainFigure.shape = prevTetroState;
    }
  }

  //Function that will check if new figure is not going out of game board
function hasCollision() {
    for (let y = 0; y < mainFigure.shape.length; y++) {
        for (let x = 0; x < mainFigure.shape[y].length; x++) {
            if (mainFigure.shape[y][x] && 
                (gameBoard[mainFigure.y + y] === undefined ||
                gameBoard[mainFigure.y + y][mainFigure.x + x] === undefined || 
                gameBoard[mainFigure.y + y][mainFigure.x + x] === 2)
                ) {
                return true
            }
        }
    }
    return false
}

// Now I need to make a function that will help me to check if whole line was filled out and then delete this line from the board and will update old row with new empty one
function removeLine() {
    let remove = true,
    filledLines = 0
    for (let y = 0; y < gameBoard.length; y++) {
        for (let x = 0; x < gameBoard[y].length; x++) {
            if (gameBoard[y][x] !== 2) {
                remove = false
                break
            }
        }
    if (remove) {
        gameBoard.splice(y, 1) // by it self is not working, need to add another splice to return back new line
        gameBoard.splice(0, 0, [0,0,0,0,0,0,0,0,0,0])// startin with index 0, Im deliting 0 element and addin new line(array)
        filledLines +=1
    }
    remove = true
    }
    switch (filledLines) {
        case 1:
          score += levels[currentLevel].scorePerLine;
          break;
        case 2:
          score += levels[currentLevel].scorePerLine * 3;
          break;
        case 3:
          score += levels[currentLevel].scorePerLine * 6;
          break;
        case 4:
          score += levels[currentLevel].scorePerLine * 12;
          break;
      }
    
      scroeEle.innerHTML = score;
    
      if (score >= levels[currentLevel].nextLevelScore) {
        currentLevel++;
        levelEle.innerHTML = currentLevel;
    }
}

//   Creating a function that will randomly chose figures from "figures"
function getNewFigure() {
    const possibleFigures = "IOLJTSZ";
    const rondo = Math.floor(Math.random() * 7);
    const newFigure = figures[possibleFigures[rondo]];
  
    return {
      x: Math.floor((10 - newFigure[0].length) / 2), //using this calculation Im chosing locotion where new figures start faling...alsomo from the center of the board 
      y: 0,//from the first line
      shape: newFigure, //game will start with random figure
    };
}

//Need to write a function with a check that will stop figure when its meet anothr figure or reach the bottom, and changing value to 2
function fixTetro(){
    for (let y = 0;y < gameBoard.length;y++){
        for (let x = 0;x < gameBoard[y].length;x++){
            if (gameBoard[y][x] === 1){
                gameBoard[y][x] = 2
            }
        }
    }
}


//function that will check where figure is fixed and drop a new figure
function pullFigureDown() {
    mainFigure.y += 1
    if (hasCollision()) {
        mainFigure.y -= 1 
        fixTetro() // so when figure going all the way down, Im calling this function to see that there is no errors and switching value to 2
        removeLine()
        mainFigure = getNewFigure()
        if (hasCollision()) {
            reset()
        }
    }
}
//   This function reseting the game  
function reset() {
    paused = true;
    clearTimeout(gameTimer);
    gameBoard = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    draw()
    gameOver.style.display = "block";
  }

// Need to creat buttons and give thaem a value
let KEY_LEFT = 37;
let KEY_RIGHT = 39;
let KEY_DOWN = 40;
let KEY_R = 82;


// Now I need to create property with a "move" function. So I google it and found the solution on w3shool and mdn
document.onkeydown = function(ev) { //creating function with events
if (!paused) {
    if(ev.keyCode === KEY_LEFT) { // 37 is a button with left arrow on a leptop keyboard
        mainFigure.x -= 1
        if (hasCollision()) {
            mainFigure.x += 1
        }
    } else if (ev.keyCode === KEY_RIGHT) {
        mainFigure.x += 1
        if (hasCollision()) {
            mainFigure.x -= 1
        }
    } else if (ev.keyCode === KEY_DOWN) {
        pullFigureDown()
    } else if (ev.keyCode === KEY_R){
        rotation()
    }
    updateGame() 
 }
}

function updateGame() {
    if (!paused) {
      updateActiveFigure();
      draw()
    }
  }

pauseBtn.addEventListener("click", (ev) => {
    if (ev.target.innerHTML === "Pause Game") {
      ev.target.innerHTML = "Keep Playing";
      clearTimeout(gameTimer); //stops the game
    } else {
      ev.target.innerHTML = "Pause Game";
      gameTimer = setTimeout(startGame, levels[currentLevel].speed); // continue game
    }
    paused = !paused;
  });
  

  startBtn.addEventListener("click", (ev) => {
    paused = false
    gameTimer = setTimeout(startGame, levels[currentLevel].speed);
    gameOver.style.display = "none";
  });

scroeEle.innerHTML = score;
levelEle.innerHTML = currentLevel;

draw()

function startGame() {
    pullFigureDown()
    if(!paused){
    updateActiveFigure()
    updateGame()
    gameTimer = setTimeout(startGame, levels[currentLevel].speed)
} 
}
// gameTimer = setTimeout(startGame, levels[currentLevel].speed)