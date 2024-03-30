const startScreen = document.getElementById('start-game');
const playScreen = document.getElementById('game-play');

const btnStart = document.getElementById('btn-start');
const btnBack = document.getElementById('btn-back');
const modeButtons = document.querySelectorAll('.btn-mode');
const btnBackMode = document.getElementById('btn-back-mode');
const gameMode = document.getElementById('game-mode');

const cells = document.querySelectorAll('.cell');
const statTxt = document.getElementById('game-status');
const btnRestart = document.getElementById('btn-restart');
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

let options = ['','','', '','','', '','',''];
let currentPlayer = 'X';
let gameRun = false;

function initGame() {
    startScreen.style.display = 'none';
    playScreen.style.display = 'block';

    cells.forEach(cell =>
        cell.addEventListener('click', handleCellClick));
        statTxt.textContent = `${currentPlayer}'s turn`;
        gameRun = true;
        restartGame();

    btnRestart.addEventListener('click', restartGame);
    btnBack.addEventListener('click', backStart);
}

function handleCellClick() {
    const cellIndex = this.getAttribute('cellIndex');
    if(options[cellIndex] != '' || !gameRun) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, number) {
    options[number] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
    statTxt.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;

    for(let i = 0; i < winningCombo.length; i++) {
        const condition = winningCombo[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == '' || cellB == '' || cellC == '') {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        };

        console.log('checkWinner is working properly');
    };

    if(roundWon) {
        statTxt.textContent = `${currentPlayer} wins!`;
        gameRun = false;
    } else if (!options.includes('')) {
        statTxt.textContent = 'Draw!';
        gameRun = false;
    } else {
        changePlayer();
    };

}

function restartGame() {
    currentPlayer = 'X';
    options = ['','','', '','','', '','',''];
    statTxt.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell =>
        cell.textContent = '');
        gameRun = true;
}

function backStart() {
    gameRun = false;

    startScreen.style.display = 'block';
    playScreen.style.display = 'none';
}

btnStart.addEventListener('click', initGame);





