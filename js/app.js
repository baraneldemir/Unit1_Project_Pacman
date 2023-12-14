function init() {
//CONSTS
const grid = document.querySelector(".grid")
const endScreen = document.querySelector(".endScreen")
//BOARD Config
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
//CREATE CELLS
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
        0, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        9, 9, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
    ]
    for (let i = 0; i < cellCount; i++ ){
    const cell = document.createElement("div")

    //add Index to div element
    // cell.innerText = i   //no need to show it so cell.id = i but data attributes better
    //add index as an attribute
    cell.dataset.index = i  //index could be anything since we use dataset   could also do cell.setattribute('data-index, i')
    //add the height and width to each grid cell (div)
    cell.style.height = `${100 / height}%`
    cell.style.width = `${100 / width}%`
    //add cell to grid
    grid.appendChild(cell)
    //add newly created cell to array
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
//handlemovement
function pacmanHandleMovement(event){
    // console.log(event.keyCode)
    const left = "ArrowLeft" 
    const up = "ArrowUp"
    const right = "ArrowRight"
    const down = "ArrowDown"
    removePacman()
    // Remove pacman from previous position before updating current position to new cell
//    console.log(pacmanCurrentPosition, width, pacmanCurrentPosition % width)
    //feed function inside the controls
    if(event.key === up && pacmanCurrentPosition >= width){ // % height also works
        // document.querySelector(".ghost").style.transform = "rotate(90deg)"
        if (!cells[(pacmanCurrentPosition - width)].classList.contains("pixelWall") ){
            pacmanCurrentPosition -= width
            if (cells[pacmanCurrentPosition].classList.contains("food") ){
                cells[pacmanCurrentPosition].classList.remove("food")
                updateScore()
            }
            //eat food statement
            }
    }else if(event.key === down && pacmanCurrentPosition + width <= cellCount -1){
        if (!cells[(pacmanCurrentPosition + width)].classList.contains("pixelWall") ){
            
            pacmanCurrentPosition += width
            if (cells[pacmanCurrentPosition].classList.contains("food") ){
                cells[pacmanCurrentPosition].classList.remove("food")
                updateScore()
            }
        }
    }else if(event.key === right){ //9 also works  // 
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
    }else if(event.key === left){ //&& 
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
    }
    addPacman(pacmanCurrentPosition)
    eatCherry()
    eatGhost()
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
        letsMove[idx] = setInterval(() => ghostMove(ghost), 200) 
    }) 
}  
    let score = 0
    document.querySelector(".score").innerHTML = score
function updateScore(){
    score += 1
    document.querySelector(".score").innerHTML = score
    return
}
function pacmanDie(position) {
    if (pacmanCurrentPosition === position){
        updateHealth()
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
    setTimeout(ghostsStartMoving, 4000) 
}
function highscoreUpdate(){
    const list = document.querySelector(".highscore")
    const newScore = document.createElement('li')
    newScore.innerHTML = document.querySelector(".score").innerHTML 
    list.appendChild(newScore)
}
function reloadGame() {
    const endScreen = document.querySelector(".endScreen")
    endScreen.style.visibility="hidden"
    grid.innerHTML = ''
    init()
}
function displayGameOver(){
    highscoreUpdate()
    const endScreen = document.querySelector(".endScreen")
    document.removeEventListener("keydown", pacmanHandleMovement)
    letsMove.forEach(move =>clearInterval(move)) 
    endScreen.style.visibility="visible"
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







