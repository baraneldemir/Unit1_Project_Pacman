Classic Pacman Game

I used HTML5, CSS & JavaScript to create this game.

https://baraneldemir.github.io/Unit1_Project_Pacman/ //you can access the game using this link

The game took me took me total of 5 days tom complete. I will now summarise the process step by step.

1) To begin with I started with creating something on my page. Which was initially the borders and the grid. After that i wanted to create the classic pacman game map through grid.
It started with this. So as you can see in the code below i have used an array like grid mapping where every 0 represents walls, 1 for food and 8 for cherry.

```
    function createGrid(){
        board = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 8, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 8, 0,
        0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 4, 0,
        0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0,
        0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
        2, 2, 2, 0, 1, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 0, 2, 2, 2,
        0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0,
        2, 2, 2, 2, 1, 1, 2, 0, 3, 3, 3, 0, 2, 1, 1, 2, 2, 2, 2,
        0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0,
        2, 2, 2, 0, 1, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 0, 2, 2, 2,
        0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0,
        0, 4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 4, 0,
        0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0,
        0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
        0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0,
        0, 8, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 8, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        9, 9, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
    ]
    for (let i = 0; i < cellCount; i++ ){
    const cell = document.createElement("div")
    cell.dataset.index = i  
    cell.style.height = `${100 / height}%`
    cell.style.width = `${100 / width}%`
    grid.appendChild(cell)
    cells.push(cell)
    }
    }
    function createWalls() {
    board.forEach((cell, idx) => {
    if(cell===0 ){
        cells[idx].classList.add("pixelWall")
    }
    })
    }
    function createFood() {
    board.forEach((cell, idx) => {
    if(cell===1 ){
        cells[idx].classList.add("food")
    }
    })   
    }
    function healthBar() {
    board.forEach((cell, idx) => {
    if(cell===9 ){
        cells[idx].classList.add("pacman")
    }
    })   
    }
    function createCherry() {
    board.forEach((cell, idx) => {
    if(cell===8 ){
        cells[idx].classList.add("cherry")
    }
    })   
    }
  ```

  2) Then i spent a few hours to decide how my pacman was going to move. Initially wanted to move it like in the classic pacman where once you click the arrow it goes until it hits the wall.
  But I wanted to come up with something different and to be honest i always annoyed by that contunius movement of the character so i come up with my own movement. 

  ```
        function pacmanHandleMovement(event){
        removePacman()
        switch (key) {
        case up :
             
                if (!cells[(pacmanCurrentPosition - width)].classList.contains("pixelWall") ){
                    pacmanCurrentPosition -= width
                    if (cells[pacmanCurrentPosition].classList.contains("food") ){
                        cells[pacmanCurrentPosition].classList.remove("food")
                        updateScore()
                    }
                    //eat food statement
                    }
                
            break
        case down:
            if (!cells[(pacmanCurrentPosition + width)].classList.contains("pixelWall") ){
                pacmanCurrentPosition += width
                if (cells[pacmanCurrentPosition].classList.contains("food") ){
                    cells[pacmanCurrentPosition].classList.remove("food")
                    updateScore()
                }
            }
            break
        case left:
            if(pacmanCurrentPosition === 190){
                pacmanCurrentPosition =  208
            }
            if (!cells[(pacmanCurrentPosition - 1)].classList.contains("pixelWall") ){
                pacmanCurrentPosition--
                if (cells[pacmanCurrentPosition].classList.contains("food") ){
                    cells[pacmanCurrentPosition].classList.remove("food")
                    updateScore()
                }
            }
            break
        case right:
            if(pacmanCurrentPosition === 208){
                pacmanCurrentPosition = 190
               }
                if (!cells[(pacmanCurrentPosition + 1)].classList.contains("pixelWall") ){
                    pacmanCurrentPosition++
                    if (cells[pacmanCurrentPosition].classList.contains("food") ){
                        cells[pacmanCurrentPosition].classList.remove("food")
                        updateScore()
                    }
                }
            break
         case space:
            if (event.code === "Space" && !gameOver) {
            togglePause()
            } else {
            pacmanHandleMovement(event)
            }
            break
            default:
            console.log("INVALID KEY")
        }   
        addPacman(pacmanCurrentPosition)     
  ```

3) After that it came to the most challenging part of the game, ghost movements. Due to the fact that i had no idea how to come up with a good algorithm of ghost movements. I spent a total one day searching how they move and what is the algorithms behind them.
As you can see in the code below i came up with the idea of available moves array and i was going to be using splice method to exclude previous move so it wasn't glitching back and fort. And was following a random paths through out the map.

```
    const ghosts = [
        { name: 'red', ghostStartingPosition:160, ghostCurrentPosition: 160 },
        { name: 'blue', ghostStartingPosition:161, ghostCurrentPosition: 161 },
        { name: 'green', ghostStartingPosition:162, ghostCurrentPosition: 162 },
        { name: 'yellow', ghostStartingPosition:321, ghostCurrentPosition: 321 },
        { name: 'purple', ghostStartingPosition:39, ghostCurrentPosition: 39 }
      ]
    function ghostMove(ghost) {
    const availableMoves = []
    const upWall = cells[(ghost.ghostCurrentPosition - width)].classList.contains("pixelWall")
    const downWall = cells[(ghost.ghostCurrentPosition + width)].classList.contains("pixelWall")
    const rightWall = cells[(ghost.ghostCurrentPosition + 1)].classList.contains("pixelWall")
    const leftWall = cells[(ghost.ghostCurrentPosition - 1)].classList.contains("pixelWall")
    if (!upWall){
        availableMoves.push("ghostUp")
    }
    if (!downWall){
        availableMoves.push("ghostDown")
    }
    if (!rightWall){
        availableMoves.push("ghostRight")
    }
    if (!leftWall){
        availableMoves.push("ghostLeft")
    }
    const moveToRemove = availableMoves.indexOf(ghost.previousMove)
    if(moveToRemove !== -1 && ghost.ghostCurrentPosition !== 190 && ghost.ghostCurrentPosition !== 208){
        availableMoves.splice(moveToRemove, 1)
    }
    const anyDirection = availableMoves[Math.floor(Math.random() * availableMoves.length)]
    removeGhost(ghost.name, ghost.ghostCurrentPosition) 
            if (anyDirection === "ghostUp" && !upWall){
                ghost.ghostCurrentPosition -= width 
                ghost.previousMove = "ghostDown"
            }else if (anyDirection === "ghostDown" && !downWall){
                ghost.ghostCurrentPosition += width 
                ghost.previousMove = "ghostUp"
            }else if (anyDirection === "ghostRight" && !rightWall) {
                if(ghost.ghostCurrentPosition === 208){
                ghost.ghostCurrentPosition = 190
                }
                ghost.ghostCurrentPosition++
                ghost.previousMove = "ghostLeft"
            }else if(anyDirection === "ghostLeft" && !leftWall){
                if(ghost.ghostCurrentPosition === 190){
                    ghost.ghostCurrentPosition = 208
                }
                ghost.ghostCurrentPosition-- 
                ghost.previousMove = "ghostRight"
            }else {
                console.log(anyDirection)
                console.log(ghost.ghostCurrentPosition)
            }
    addGhost(ghost.ghostCurrentPosition, ghost.name)
    pacmanDie(ghost.ghostCurrentPosition)
    }
```
4) Then i created the other functions to make the game to be more playable.
```
  
    function pacmanDie(position) {
    if (pacmanCurrentPosition === position){
        removePacman(pacmanCurrentPosition)
        pacmanCurrentPosition = pacmanStartingPosition
        addPacman(pacmanCurrentPosition)
        
        
        updateHealth()
        playDeath()
    }
    }
    function updateHealth(){
    if (cells[420].classList.contains("pacman")){
        cells[420].classList.remove("pacman") 
    }else if (cells[419].classList.contains("pacman")){
        cells[419].classList.remove("pacman")
    }else { 
        cells[418].classList.remove("pacman")
        displayGameOver()}
    }
    function eatCherry() {
    if(cells[pacmanCurrentPosition].classList.contains("cherry")) {
        cells[pacmanCurrentPosition].classList.remove("cherry")
        turnGhostsScared()        
    }
    }
```
5) I then created a point tracking function.
```
    let score = 0
    document.querySelector(".score").innerHTML = score
    function updateScore(){
    playEat()
    score += 1
    document.querySelector(".score").innerHTML = score

    }
```


6) Then i worked around end game and score display

```
    function leaderBoardUpdate(){
    const leaderBoard = document.querySelector(".leaderBoard")
    const newHighscore = document.createElement('li')
    newHighscore.innerHTML = document.querySelector(".score").innerHTML 
    leaderBoard.appendChild(newHighscore)
        }
    function highscoreUpdate(){
    const list = document.querySelector(".highscore")
    const newScore = document.createElement('li')
    newScore.innerHTML = document.querySelector(".score").innerHTML 
    list.appendChild(newScore)
    leaderBoardUpdate()
    }
    function reloadGame() {
    document.querySelector(".again").removeEventListener("click", reloadGame)
    console.log("asadas")
    const endScreen = document.querySelector(".endScreen")
    endScreen.style.visibility="hidden"
    grid.innerHTML = ''
    init()
    // window.location.reload()
    }   
    function checkwin(){
    if(score === 155){
    createFood()
    } else if(score === 310){
    createFood()
    } else if(score === 465){
        createFood()
    } else if(score === 620){
        createFood()
    } else if(score === 775){
        createFood()
    } else if(score === 930){
        createFood()
        createCherry()
    } else if(score === 1085){
        createFood()
    }
    }
    function displayGameOver(){
    highscoreUpdate()
    const endScreen = document.querySelector(".endScreen")
    document.removeEventListener("keydown", pacmanHandleMovement)
    upButton.removeEventListener("click", () => pacmanHandleMovement("up"))
    downButton.removeEventListener("click", () => pacmanHandleMovement("down"))
    leftButton.removeEventListener("click", () => pacmanHandleMovement("left"))
    rightButton.removeEventListener("click", () => pacmanHandleMovement("right"))
    letsMove.forEach(move =>clearInterval(move)) 
    endScreen.style.visibility="visible"
    }
  
```

8) Lastly i wanted to add background music and some other features to improve my gae yet i cam across with quite a lot of bugs while i was implementing that so the next step i will be working on in my next project will be focusing on that. 

As a conclusion i can say that this was super fun as my first project. Working around functions and learning the algorithms adn styling. One thing that i will be focusing on in other projects of mine will deffinetly is going to be about improving the base structure of my game and how i can implement new functions easier. Another thing will be background music since i think that is one of the most imporant aspect of a game.
Thank you for checking out my first game! I hope you enjoyed.


