const restartBtn = document.getElementById('restartBtn')
const playerText = document.getElementById('playerText')
const boxes = Array.from(document.getElementsByClassName('box')) 
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')
let drawIndicator = getComputedStyle(document.body).getPropertyValue('--draw-indicator')
let X_ScoreText = document.getElementById('X_playerScore')
let O_ScoreText = document.getElementById('O_playerScore')
let drawText = document.getElementById('drawScore')

let scoreX = 0
let scoreO = 0
let drawScore = 0

const O_choice = 'O'
const X_choice = 'X'
let currentPlayer = X_choice  
const spaces = Array(9).fill(null)
let count_plays = 0
 
const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],   
]

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))    
    
}

function boxClicked(e) {
    const id = e.target.id 

    if(!spaces[id] && count_plays < 9){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() !==false){             
            if(currentPlayer == X_choice){   
                playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()
            count_plays = 10
            winning_blocks.map(box => boxes[box].style.backgroundColor=winnerIndicator)
            scoreX++            
            X_ScoreText.innerHTML = `player x score: ${scoreX}`            

            return
            }
            if(currentPlayer == O_choice){   
                playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()
            count_plays = 10
            winning_blocks.map(box => boxes[box].style.backgroundColor=winnerIndicator)
            scoreO++            
            O_ScoreText.innerHTML = `player O score: ${scoreO}`
            return
            }

        }
        count_plays++
        currentPlayer = currentPlayer == X_choice ? O_choice : X_choice  
        let player = currentPlayer
        playerText.innerHTML = `player ${player} turn`             
    }
    if(count_plays === 9){   
        playerText.innerHTML = 'Draw Game'
        boxes.forEach(box => box.style.color = drawIndicator) 
        drawScore++            
        drawText.innerHTML = `Draw's: ${drawScore}`
    }    
}

function playerHasWon () {
    for(const condition of winningConditions){
        let [a,b,c] = condition  

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){  
            return [a,b,c]
        }        
    }
    return false
}

restartBtn.addEventListener('click',restart)

function restart() {  
    spaces.fill(null)
    count_plays = 0
    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor = ''
        box.style.color = 'black'
    })
    playerText.innerHTML = `player x turn`

    currentPlayer = X_choice
}
startGame()


































