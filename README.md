## My-First-Project
# "Tetris Game"

Game Description:
In Tetris, player must complete lines by moving differently shaped pieces, which descend onto the playing field. The completed lines disappear and grant the player points, and the player can proceed to fill the vacated spaces. The longer the player can delay this inevitable outcome, the higher score will be. This game has One Player Mode, but you can compete with your friends and see who will reach the highest score in this game. The game ends when the playing field is filled.


![alt text](https://github.com/joejons55/First-Project/blob/master/Tetris-Project.png)


List of Rules:
* Game Board is 10x20.
* Tetromino clolor are as follows:
  - Moving figures are brown.
  - Fixed figures are green.
  
Tetromino start locations:
* All figures start moving form the top in the middle columns.

Mappings for computer keyboards:
* "Left" arrow moving figure to the left side.
* "Right" arrow moving figure to the right side.
* "Down" arrow allows you to move figure down with a higher speed.
* "R" on your keyboard allows you to rotate all figures.

Buttons on the screen:
* "Start Game" - you can click with your mouse on this button to initiate the game.
* "Pause Game/Keep Playing" - you can click with your mouse on this button to pause and unpause the game.

End of the game:
When the playing field is filled, player will receive a message "GAME OVER", and the game will be reseted. 

Technology used:
HTML, CSS(flex), JavaScript. 

Upproach:
First, I created in HTML file all elements that I wanted to use. Than in css, using those elements I created the game board, cells inside the game board, buttons and score section. Using js I created 7 figures with different shape, wrote functions that randomly drops new figure from the top of the game board, function that checks what will happen if figure collide into the wall or another figure, function that will remove filled lines(rows) and add a score for that, game speed that will increased based on the level you are playing, function that adds different events to buttons on the screen and buttons on your keyboard.

Unsolved Problem:
* To restart the game you will need to reload your page in your browser and click again on "Start Game" button.
* Game designed only for one player. 
* Give a differente color to each figure. 

Section of the code Im proud off:
function rotation() {
    const prevTetroState = mainFigure.shape;
    mainFigure.shape = mainFigure.shape[0].map((val, index) =>
      mainFigure.shape.map((row) => row[index]).reverse()
    );
    if (hasCollision()) {
      mainFigure.shape = prevTetroState;
    }
  }


[Check out my game here!!!(https://tetris-game-vladomel.netlify.app]
