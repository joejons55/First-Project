// I will connect a board with cells with js file
let main = document.querySelector(".main")//Im going to use it later
// Create Score Container
let scoreContainer = document.createElement("div")
scoreContainer.setAttribute("class", "scoreContainer")
document.body.appendChild(scoreContainer)
//Add button to start the game
// const startBtn = document.querySelector('.s')
// startBtn.addEventListener("click", starGame)
// Game Speed
let gameSpeed = 500
// Array with arrays that will store differen values and single array
let singleArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
let playField = [
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

// Need 
// let game = {
//     // Player Score

//     playerScore: 0,
//     // CPU Score

//Need to create a function that will check each array(y) in array(playField) and each element(x) in this all arras(y). After check it will return
function draw() {
    let mainInnerHTML = ``
    for (let y = 0;y < playField.length;y++){
        for (let x = 0;x < playField[y].length;x++){
            if (playField[y][x] === 1){
                mainInnerHTML += `<div class="cell movingCell"></div>`
            } else if (playField[y][x] === 2) {
                mainInnerHTML += `<div class="cell fixedCell"></div>`
            } else {
                mainInnerHTML += `<div class="cell"></div>`
            }
        }
    }
    main.innerHTML = mainInnerHTML
}

function removeActiveFigure() {
    for (let y = 0;y < playField.length;y++) {
        for (let x = 0;x < playField[y].length;x++){
            if (playField[y][x] === 1) {
                playField[y][x] = 0
            }
        }
    }
}


//Need to write a code that will move DOWN figures on my board
function moveTetrDown() {
    if (canMoveTetrDown()) { // Calling a canMoveTetrDown function in moveTetrDown function
    for (let y = playField.length - 1;y >= 0 ;y--){
        for (let x = 0;x < playField[y].length;x++){
           if (playField[y][x] === 1){
               playField[y + 1][x] = 1
               playField[y][x] = 0
           } 
           }
        } 
    } else {
        fixTetro() // calling this function in this position so it will not show any errors when it reach the bottom
    }
}

//Need to write a code that will check if figure need to move after reach the bottom 
function canMoveTetrDown() {
    for (let y = 0;y < playField.length;y++){
        for (let x = 0;x < playField[y].length;x++){ 
           if (playField[y][x] === 1){
            if(y === playField.length - 1 || playField[y +1][x] === 2) {
                return false
            }
           }
        }
    }
    return true
}

// Now I can write a function that will move LEFT figures on my board
function canTetrMoveLeft() {
    for (let y = 0; y < playField.length; y++) {
      for (let x = 0; x < playField[y].length; x++) {
        if (playField[y][x] === 1) {
          if (x === 0 || playField[y][x - 1] === 2) {
            return false;
          }
        }
      }
    }
    return true;
  }
  
  function moveTetrLeft() {
    if (canTetrMoveLeft()) {
      for (let y = playField.length - 1; y >= 0; y--) {
        for (let x = 0; x < playField[y].length; x++) {
          if (playField[y][x] === 1) {
            playField[y][x - 1] = 1;
            playField[y][x] = 0;
          }
        }
      }
    }
  }

//Now I can write a function that will move Right figures on my board
function moveTetrRight() {
    if (canMoveTetrRight()) { 
    for (let y = playField.length - 1;y >= 0 ;y--){
        for (let x = 9;x >= 0;x--){
           if (playField[y][x] === 1){
               playField[y][x + 1] = 1
               playField[y][x] = 0 //When it reach all the way to the right it will not move further
           } 
           }
        } 
    
    } 
}

function canMoveTetrRight() {
    for (let y = 0;y < playField.length;y++){
        for (let x = 0;x < playField[y].length;x++){
           if (playField[y][x] === 1){
            if(x === 9 || playField[y][x + 1] === 2) {
                return false
            }
           }
        }
    }
    return true
}

// Need to create a function that will update board with new figure
function updateActiveFigure() {
    removeActiveFigure()
    for (let y = 0; y < newArr.shape.length; y++) {
        for (let x = 0; x <newArr.shape[y].length; x++) {
            if (newArr.shape[y][x]) {
                playField[newArr.y + y][newArr.x + x] = newArr.shape[y][x]
            }
        }
    }
}

//Need to write a function with a check that will stop figure when its meet anothr figure or rach the bottom, and will call a new figure
function fixTetro(){
    for (let y = 0;y < playField.length;y++){
        for (let x = 0;x < playField[y].length;x++){
            if (playField[y][x] === 1){
                playField[y][x] = 2
            }
        }
    }
    removeLine() //calling this function to remove last line 

    playField[0] = [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    playField[1] = [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
}

//Need to create a new objects, and inside those objects need to create arrays, so after I can creat a function that will randomize those arrays
let newArr = {
    x: 0,
    y: 0,
    shape: [
        [1, 1, 1], 
        [0, 1, 0], 
        [0, 0, 0]
    ],
}

//Function that will check if new figure is not going out of it box
function hasCollision() {
    for (let y = 0; y < newArr.shape.length; y++) {
        for (let x = 0; x <newArr.shape[y].length; x++) {
            if ((newArr.shape[y][x] && playField[newArr.y + y] === undefined) ||
                (playField[newArr.y + y][newArr.x + x] === undefined)) {
                return true
            }
        }
    }
    return false
}

// Now I need to make a function that will help me to check if whole line was filled out and then delete this line from the board
function removeLine() {
    let remove = true
    for (let y = 0; y < playField.length; y++) {
        for (let x = 0; x < playField[y].length; x++) {
            if (playField[y][x] !== 2) {
                remove = false
                break
            }
        }
    if (remove) {
        playField.splice(y, 1) // by it self is not working, need to add another splice to return back new line
        playField.splice(0, 0, singleArr)// startin with index 0, Im deliting 0 element and addin new line(array)
    }
    remove = true
    }
}

// function startGame() {
//     moveTetrDown()
//     draw()
//     setTimeout(startGame, gameSpeed)
// } 


// Need to creat buttons and give thaem a value
let KEY_LEFT = 37;
let KEY_RIGHT = 39;
let KEY_DOWN = 40;
let KEY_A = 65;
let KEY_D = 68;
let KEY_SPACE = 32;


// Now I need to create property with a "move" function. So I google it and found the solution
document.onkeydown = function(e) { //creating function with events
    if(e.keyCode === KEY_LEFT) { // 37 is a button with left arrow on a leptop keyboard
        newArr.x -= 1
        if (hasCollision()) {
            newArr.x += 1
        }
    } else if (e.keyCode === KEY_RIGHT) {
        newArr.x += 1
        if (hasCollision()) {
            newArr.x -= 1
        }
    } else if (e.keyCode === KEY_DOWN) {
        newArr.y += 1
        if (hasCollision()) {
            newArr.y -= 1
        }
    } else if (e.keyCode === KEY_SPACE) {
        pauseGame()
    } 
    updateActiveFigure()
    draw() //caling this function again to make more smoth move  
}
updateActiveFigure()
draw()
setTimeout(startGame, gameSpeed)