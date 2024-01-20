function init() {
   
//CONSTS
const grid = document.querySelector(".grid")
//BOARD Config
// const playPauseButton = document.querySelector(".play")
const width = 19
const height = 23
const cellCount = width * height
let cells=[]
let letsMove = []
//CHARACTER CONFIG
const pacmanStartingPosition = 237
let pacmanCurrentPosition = pacmanStartingPosition
// ! FUNCTIONS
function game(){
    createGrid()
    createWalls()
    createFood()
    addPacman(pacmanCurrentPosition)
    ghostsStartMoving()
    healthBar()
    createCherry()
}  

//MAP
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
 /*---------- Key Controls ----------*/
 
 const upButton = document.querySelector(".upButton")
 const downButton = document.querySelector(".downButton")
 const leftButton = document.querySelector(".leftButton")
 const rightButton = document.querySelector(".rightButton")

 upButton.addEventListener("click", () => pacmanHandleMovement("up"))
 downButton.addEventListener("click", () => pacmanHandleMovement("down"))
 leftButton.addEventListener("click", () => pacmanHandleMovement("left"))
 rightButton.addEventListener("click", () => pacmanHandleMovement("right"))



//handlemovement

function pacmanHandleMovement(event){
    removePacman()
/////////////////////////////
let key;

    if (typeof event === 'string') {
        // If the event is a string, it means it came from the button click
        // Assign the corresponding keyCode based on the button
        switch (event) {
            case "up":
                key = 38
                break
            case "down":
                key = 40
                break
            case "left":
                key = 37
                break
            case "right":
                key = 39
                break
            default:
                console.log("INVALID BUTTON")
                return
        }
        
    } else {
        // If it's a keyboard event, get the keyCode
        key = event.keyCode
    }

    const up = 38
    const down = 40
    const left = 37
    const right = 39
    const space = 32

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
    /////////////////////
   
    // if (typeof event === 'string') 
    // if(event.key === up || upButton.ontouchstart && pacmanCurrentPosition >= width){ 
    //     if (!cells[(pacmanCurrentPosition - width)].classList.contains("pixelWall") ){
    //         pacmanCurrentPosition -= width
    //         if (cells[pacmanCurrentPosition].classList.contains("food") ){
    //             cells[pacmanCurrentPosition].classList.remove("food")
    //             updateScore()
    //             console.log("asdasd")
    //         }
    //         //eat food statement
    //         }
    // }else if(event.key === down || downButton.ontouchstart && pacmanCurrentPosition + width <= cellCount -1){
    //     if (!cells[(pacmanCurrentPosition + width)].classList.contains("pixelWall") ){
    //         pacmanCurrentPosition += width
    //         if (cells[pacmanCurrentPosition].classList.contains("food") ){
    //             cells[pacmanCurrentPosition].classList.remove("food")
    //             updateScore()
    //         }
    //     }
    // }else if(event.key === right || rightButton.ontouchstart){ //9 also works  // 
    //     if(pacmanCurrentPosition === 208){
    //     pacmanCurrentPosition = 190
    //    }
    //     if (!cells[(pacmanCurrentPosition + 1)].classList.contains("pixelWall") ){
    //         pacmanCurrentPosition++
    //         if (cells[pacmanCurrentPosition].classList.contains("food") ){
    //             cells[pacmanCurrentPosition].classList.remove("food")
    //             updateScore()
    //         }
    //     }
    // }else if(event.key === left || leftButton.ontouchstart){ //&& 
    //     if(pacmanCurrentPosition === 190){
    //         pacmanCurrentPosition =  208
    //     }
    //     if (!cells[(pacmanCurrentPosition - 1)].classList.contains("pixelWall") ){
    //         pacmanCurrentPosition--
    //         if (cells[pacmanCurrentPosition].classList.contains("food") ){
    //             cells[pacmanCurrentPosition].classList.remove("food")
    //             updateScore()
    //         }
    //     }
    // }
    addPacman(pacmanCurrentPosition)
    eatCherry()
    eatGhost()
    checkwin()
}
    // ADD pacman CLASS
    function addPacman(pacmanPosition){
        cells[pacmanPosition].classList.add("pacman")
    }
    function addGhost(ghostPosition, ghostName){
        cells[ghostPosition].classList.add(`${ghostName}`)
    }
    // remove pacman class 
    function removePacman(pacmanPosition){
        cells[pacmanCurrentPosition].classList.remove("pacman")
    }
    function removeGhost(ghostName, ghostCurrentPosition){
        cells[ghostCurrentPosition].classList.remove(`${ghostName}`)
    }   
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
function eatGhost() {
    if(cells[pacmanCurrentPosition].classList.contains("red")){
        cells[pacmanCurrentPosition].classList.remove("red")
    }else if(cells[pacmanCurrentPosition].classList.contains("blue")) {
        cells[pacmanCurrentPosition].classList.remove("blue")
    }else if(cells[pacmanCurrentPosition].classList.contains("yellow")) {
        cells[pacmanCurrentPosition].classList.remove("yellow")
    }else if(cells[pacmanCurrentPosition].classList.contains("green") ){
        cells[pacmanCurrentPosition].classList.remove("green")
    }else {
        cells[pacmanCurrentPosition].classList.remove("purple")                  
    }
}
function turnGhostsBlue(){
}
function ghostsStartMoving(){
    ghosts.forEach((ghost, idx) => { 
        letsMove[idx] = setInterval(() => ghostMove(ghost), 100) 
    }) 
}  
    let score = 0
    document.querySelector(".score").innerHTML = score
function updateScore(){
    playEat()
    score += 1
    document.querySelector(".score").innerHTML = score

}
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
function turnGhostsScared() {
    letsMove.forEach(move =>clearInterval(move)) 
    turnGhostsBlue()
    setTimeout(ghostsStartMoving, 2500) 
}
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
function playDeath(){
    let deathAudio = new Audio("https://cdn.freesound.org/previews/266/266163_4284968-lq.mp3")
    deathAudio.play()
    deathAudio.volume = 0.35
}
function playEat(){
    let eatAudio = new Audio("https://cdn.freesound.org/previews/341/341695_5858296-lq.mp3")
    eatAudio.play()
    eatAudio.volume = 0.05
}
// ! EVENTS
document.addEventListener("keydown", pacmanHandleMovement)
document.querySelector(".again").addEventListener("click", reloadGame)
// ! PAGE LOAD
game()
}
window.addEventListener('DOMContentLoaded', init)


// ghostMovement 


// random number set speed of interval 







