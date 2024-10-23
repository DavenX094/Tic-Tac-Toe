const cells = document.querySelectorAll('[data-cell]');
const winnerMessage = document.querySelector('.winner-message');
const winnerText = document.querySelector('[data-winner-text]');
const restartButton = document.querySelector('.restart-button');
let currentPlayer = 'X';
let gameActive = true;
const board = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(event) {
    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (board[cellIndex] || !gameActive) return;

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        endGame(false);
    } else if (board.every(cell => cell)) {
        endGame(true);
    } else {
        swapPlayer();
    }
}

function swapPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function endGame(draw) {
    gameActive = false;
    winnerMessage.style.display = 'block';
    restartButton.style.display = 'block';

    if (draw) {
        winnerText.textContent = ''; 
        winnerMessage.textContent = 'Draw!'; 
    } else {
        winnerText.textContent = currentPlayer; 
        winnerMessage.textContent = `Player ${currentPlayer} Wins!`;
    }
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    board.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
    });
    winnerMessage.style.display = 'none';
    restartButton.style.display = 'none';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
