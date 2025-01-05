const gameBoard = document.querySelector('.game-board');
const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let boardState = Array(9).fill(null);

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;
    if (boardState[index]) return;

    boardState[index] = currentPlayer;
    cell.classList.add('taken');
    cell.textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
        alert(`${currentPlayer} wins!`);
        resetGame();
    } else if (boardState.every(cell => cell)) {
        alert("It's a draw!");
        resetGame();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin(player) {
    return winningCombos.some(combo =>
    combo.every(index => boardState[index] === player)
    );
}

function resetGame() {
    boardState.fill(null);
    cells.forEach(cell => {
    cell.classList.remove('taken');
    cell.textContent = '';
    });
    currentPlayer = 'X';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));