const gameBoard = document.querySelector('.game-board');
const cells = document.querySelectorAll('.cell');
const timerDisplay = document.getElementById('timer');
const currentPlayerDisplay = document.getElementById('current-player');

const xWinsDisplay = document.getElementById('x-wins');
const oWinsDisplay = document.getElementById('o-wins');
const drawsDisplay = document.getElementById('draws');
const resetScoresButton = document.getElementById('reset-scores');

let currentPlayer = 'X';
let boardState = Array(9).fill(null);
let timer;
let timeLeft = 15;

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];


function initializeResults() {
    const results = JSON.parse(localStorage.getItem('ticTacToeResults')) || { X: 0, O: 0, Draw: 0 };
    localStorage.setItem('ticTacToeResults', JSON.stringify(results));
    updateResultsDisplay(results);
}

function updateResultsDisplay(results) {
    xWinsDisplay.textContent = results.X;
    oWinsDisplay.textContent = results.O;
    drawsDisplay.textContent = results.Draw;
}

function updateResults(winner) {
    const results = JSON.parse(localStorage.getItem('ticTacToeResults'));
    if (winner === 'X' || winner === 'O') {
        results[winner]++;
    } else {
        results.Draw++;
    }
    localStorage.setItem('ticTacToeResults', JSON.stringify(results));
    updateResultsDisplay(results);
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 15;
    timerDisplay.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            alert(`${currentPlayer} ran out of time! Reseting table.`);
            resetGame();
        }
    }, 1000);
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentPlayerDisplay.textContent = currentPlayer;
    startTimer();
}

function handleCellClick(e) {
    e.stopPropagation();
    const cell = e.target;
    const index = cell.dataset.index;
    if (boardState[index]) return;

    boardState[index] = currentPlayer;
    cell.classList.add('taken');
    cell.textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
        alert(`${currentPlayer} wins!`);
        updateResults(currentPlayer);
        resetGame();
    } else if (boardState.every(cell => cell)) {
        alert("It's a draw!");
        updateResults('Draw');
        resetGame();
    } else if (boardState.every(cell => cell)) {
        clearInterval(timer);
        alert("It's a draw!");
        updateResults('Draw');
        resetGame();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentPlayerDisplay.textContent = currentPlayer;
        startTimer();
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
    currentPlayerDisplay.textContent = currentPlayer;
    startTimer();
}

function resetScores() {
    localStorage.setItem('ticTacToeResults', JSON.stringify({ X: 0, O: 0, Draw: 0 }));
    updateResultsDisplay({ X: 0, O: 0, Draw: 0 });
}

function highlightCell(e) {
    const cell = e.target;
    const computedStyle = getComputedStyle(cell);
    const originalBg = computedStyle.backgroundColor;
    let color = Math.floor(Math.random() * 5);
    if (color === 1) {
        cell.style.backgroundColor = 'lightblue';
    } else if (color === 2) {
        cell.style.backgroundColor = 'lightgreen';
    } else if (color === 3) {
        cell.style.backgroundColor = 'orange';
    } else if (color === 4) {
        cell.style.backgroundColor = 'yellow';
    } else {
        cell.style.backgroundColor = 'pink';
    }

    cell.addEventListener('mouseleave', () => {
        cell.style.backgroundColor = "#666";
    }, { once: true });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
    cell.addEventListener('mouseenter', highlightCell);
});

resetScoresButton.addEventListener('click', resetScores);

initializeResults();
startTimer();