const startScreen = document.getElementById('start-game');
const playScreen = document.getElementById('game-play');

const btnStart = document.getElementById('btn-start');
const btnBack = document.getElementById('btn-back');
const gameMode = document.getElementById('game-mode');
const btnFriend = document.getElementById('btn-play-friend');
const btnAI = document.getElementById('btn-play-ai');
const playXTxt = document.getElementById('playing-as-x');
const statSec = document.getElementById('status-section');

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

let options = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameRun = false;
let playAI = false;

const clickSound = new Audio("media\\click-sound.mp3");

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

const scribbleSound = new Audio("media\\scribble.mp3");

function playScribbleSound() {
    scribbleSound.currentTime = 0;
    scribbleSound.play();
}

// starts the game
function initGame() {
    // hides unnecessary divs
    // shows play screen and game board contained within
    startScreen.style.display = 'none';
    gameMode.style.display = 'none';
    playScreen.style.display = 'block';

    // for each of the cells on the game board, two click event listeners are called
    // one for handling what happens when player clicks on a cell
    // one to play the sound effect
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
        cell.addEventListener('click', playScribbleSound);
    });

    // updates the current status of the game, i.e., it's o's turn or it's x's turn
    statTxt.textContent = `${currentPlayer}'s turn`;

    // sets game to running, which was previously set to false
    gameRun = true;

    // resets stats should the player want to replay the game; without this function stats don't reset when the gameboard already has data in it
    restartGame();

    // event listeners for play again button and back to start button
    btnRestart.addEventListener('click', function() {
        playClickSound();
        restartGame();
    });

    btnBack.addEventListener('click', function() {
        playClickSound();
        backStart();
    });
}

function handleCellClick() {
    // gets the attribute of cellIndex, as each has an index value that can be used to check for winning combos
    const cellIndex = this.getAttribute('data-cellindex');

    // checks if a cell has already been clicked on, if yes then player can't click on it anymore (code below doesn't run)
    if (options[cellIndex] != '' || !gameRun) {
        return;
    }

    if (playAI == true) {
        // if playing against AI, then it will checkWinner twice, once after updating the player's cell click and another time after the AI has made its move
        updateCell(cellIndex);
        checkWinner();
        AIPlays();
        checkWinner();
    } else {
        // if not playing against AI, simply checkWinner after the player has made their click
        updateCell(cellIndex);
        checkWinner();
    }
}

function updateCell(index) {
    // function takes index as parameter to check if options (array) have been filled, as in clickable cells
    options[index] = currentPlayer;

    // creates const of cell and using it to update the cell that the player clicked on to mark it on the board
    const cell = document.querySelector(`[data-cellindex="${index}"]`);
    cell.textContent = currentPlayer;
}

function changePlayer() {
    // function to change player (from X to O and vice versa) and update the status text to show whose turn it is
    // if the statement of currentPlayer == 'X' is true, then it's O's turn; if it's false then it's X's turn
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
    statTxt.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    // sets roundWon to false as game has not been won yet
    let roundWon = false;

    for (let i = 0; i < winningCombo.length; i++) {
        // checks if there is a winner by looping through winningCombos array 
        // you win by filling in three spaces in a row
        const condition = winningCombo[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        // if cells in winning combo are empty, then code below doesn't run as you can't win tic tac toe by having empty boxes
        if (cellA == '' || cellB == '' || cellC == '') {
            continue;
        }
        // if all three cells are clicked on by the same player, then they have won and roundWon is set to true
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        };
    };

    const winSound = new Audio ("media\\win.mp3");

    function playWin() {
        winSound.currentTime = 0;
        winSound.play();
    }

    if (roundWon) {
        // if the round has been won, then gameRun is set to false as the game has stopped and the status text updates to say ${current player} wins (could be X or O)
        playWin();
        statTxt.textContent = `${currentPlayer} wins!`;
        gameRun = false;
    } else if (!options.includes('')) {
        // if there are no more options/cells to click and no one has won, then it is a draw, the game stops, and the status text reflects appropriately
        statTxt.textContent = 'Draw!';
        gameRun = false;
    } else {
        // if the first two conditions are false, then switch player as the game hasn't finished yet!
        changePlayer();
    };
}

function restartGame() {
    // function for resetting the stats so if player wants to restart the game, options become avaliable for selection again and the gameboard is empty
    currentPlayer = 'X';
    options = ['', '', '', '', '', '', '', '', ''];

    statTxt.textContent = `${currentPlayer}'s turn`;

    cells.forEach(cell =>
        cell.textContent = '');
    gameRun = true;

}

function backStart() {
    // for going back to the starting page, if player wants to switch the game mode
    gameRun = false;

    startScreen.style.display = 'flex';
    playScreen.style.display = 'none';
}

function AIPlays() {
    // making sure computer doesn't go when it's player's turn
    if (currentPlayer === 'X') {
        return;
    }

    // enables playAI which allows computer to play
    let playAI = true;

    // makes the computer select a cell space randomly (multiplied by 9 as there are 9 cells to choose from) while it is the computer's turn
    while (playAI) {
        const randomIndex = Math.floor((Math.random() * 9))

        // if comp selected an empty cell/option, then the gameboard updates as it is valid
        if (options[randomIndex] === '') {
            updateCell(randomIndex);
            // afterwards, playAI is set to false as the computer has finished its turn
            playAI = false;
        } else {
            // else - if comp has not selected a valid square yet - it will keep trying until it's found an empty cell
            continue;
        }
    }
}

// adds event listener for start button, includes functionality to hide starting screen and reveal game mode screen upon click
btnStart.addEventListener('click', function() {
    startScreen.style.display = 'none';
    gameMode.style.display = 'flex';
    playClickSound();
}); 

// adds event listener for play with AI button, includes functionality to enable playAI, reveal a couple of relevant elements, and initialize the game
btnAI.addEventListener('click', function() {
    playAI = true;
    playXTxt.style.display = 'flex';
    statSec.style.display = 'flex';
    playClickSound();
    initGame();
});

// adds event listener for play with friend button, includes functionality to disable playAI, hide and reveal a couple of relevant elements, and initialize the game
btnFriend.addEventListener('click', function() {
    playAI = false;
    playXTxt.style.display = 'none';
    statSec.style.display = 'block';
    playClickSound();
    initGame();
});