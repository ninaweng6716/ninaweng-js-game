// switch screen function. Parameter of gamescreen w/ switch break
// game instruction
// function for startgame, endgame, resetgame as well
// for each loop for each of the 9 cells
// winning condition 

const playerX = 'x';
const playerO = 'circle';
const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const cells = document.querySelectorAll('.cell');
const gameBoard = document.getElementById('game-board');
const winloseMsg = document.querySelector('.winlose-msg');
const btnStart = document.querySelector('.btn-start')
const btnRestart = document.querySelector('.btn-restart');
let isPlayerOTurn = false;

function startGame() {
    isPlayerOTurn = false;
    cells.forEach(cell => {
        cell.classList.remove(playerXClass);
        cell.classList.remove(playerOClass);
        cell.removeEventListener('click', handleCellClick);
        cell.addEventListener('click', handleCellClick, { once: true })
    })
    setBoardHoverClass();
    winloseMsg.classList.remove('show');
}

function handleCellClick(e) {
    const cellClick = e.target;
    const currentClass = isPlayerOTurn ? playerOClass : playerXClass;
    placeMark(cellClick, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        winloseMsg.innerHTML = 'Draw!';
    } else {
        // need to figure out how to make code below say you or opponent wins
        winloseMsg.innerHTML = 'Player wins!';
    }
    winloseMsg.classList.add('show');
}

[btnStart, btnRestart].forEach(btn => 
    btn.addEventListener('click', startGame));
