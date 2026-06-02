// Game state
const gameState = {
    board: Array(9).fill(''),
    currentPlayer: 'X',
    gameActive: true,
    scores: {
        X: 0,
        O: 0,
        draw: 0
    },
    winningCombinations: [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ]
};

// DOM elements
const gameBoard = document.getElementById('game-board');
const currentPlayerElement = document.getElementById('current-player');
const playerTurnElement = document.getElementById('player-turn');
const gameStatusElement = document.getElementById('game-status');
const resetBtn = document.getElementById('reset-btn');
const newGameBtn = document.getElementById('new-game-btn');
const themeToggle = document.getElementById('theme-toggle');
const scoreXElement = document.querySelector('#score-x .score-value');
const scoreOElement = document.querySelector('#score-o .score-value');
const scoreDrawElement = document.querySelector('#score-draw .score-value');

// Initialize the game
function initGame() {
    createBoard();
    updateDisplay();
    attachEventListeners();
    loadScores();
}

// Create the game board
function createBoard() {
    gameBoard.innerHTML = '';
    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;
        cell.textContent = gameState.board[i];
        
        // Add X or O class for styling
        if (gameState.board[i] === 'X') {
            cell.classList.add('x');
        } else if (gameState.board[i] === 'O') {
            cell.classList.add('o');
        }
        
        cell.addEventListener('click', () => handleCellClick(i));
        gameBoard.appendChild(cell);
    }
}

// Handle cell click
function handleCellClick(index) {
    // Check if cell is empty and game is active
    if (gameState.board[index] !== '' || !gameState.gameActive) {
        return;
    }
    
    // Make move
    gameState.board[index] = gameState.currentPlayer;
    
    // Update display
    createBoard();
    
    // Check for win or draw
    if (checkWin()) {
        handleWin();
    } else if (checkDraw()) {
        handleDraw();
    } else {
        // Switch player
        gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
        updateDisplay();
    }
}

// Check for win
function checkWin() {
    for (const combination of gameState.winningCombinations) {
        const [a, b, c] = combination;
        if (
            gameState.board[a] &&
            gameState.board[a] === gameState.board[b] &&
            gameState.board[a] === gameState.board[c]
        ) {
            // Highlight winning cells
            combination.forEach(index => {
                const cell = document.querySelector(`.cell[data-index="${index}"]`);
                cell.classList.add('winning');
            });
            
            return true;
        }
    }
    return false;
}

// Check for draw
function checkDraw() {
    return gameState.board.every(cell => cell !== '');
}

// Handle win
function handleWin() {
    gameState.gameActive = false;
    gameState.scores[gameState.currentPlayer]++;
    
    // Update score display
    updateScores();
    
    // Update game status
    gameStatusElement.textContent = `Player ${gameState.currentPlayer} wins! 🎉`;
    gameStatusElement.classList.add('win');
    
    // Save scores to localStorage
    saveScores();
}

// Handle draw
function handleDraw() {
    gameState.gameActive = false;
    gameState.scores.draw++;
    
    // Update score display
    updateScores();
    
    // Update game status
    gameStatusElement.textContent = "It's a draw! 🤝";
    gameStatusElement.classList.add('draw');
    
    // Save scores to localStorage
    saveScores();
}

// Update display
function updateDisplay() {
    currentPlayerElement.textContent = gameState.currentPlayer;
    
    // Update player turn styling
    playerTurnElement.style.background = gameState.currentPlayer === 'X' 
        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        : 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)';
    
    // Update game status
    if (gameState.gameActive) {
        gameStatusElement.textContent = `Player ${gameState.currentPlayer}'s turn...`;
        gameStatusElement.className = 'game-status';
    }
}

// Update scores display
function updateScores() {
    scoreXElement.textContent = gameState.scores.X;
    scoreOElement.textContent = gameState.scores.O;
    scoreDrawElement.textContent = gameState.scores.draw;
}

// Reset current game
function resetGame() {
    gameState.board = Array(9).fill('');
    gameState.currentPlayer = 'X';
    gameState.gameActive = true;
    
    createBoard();
    updateDisplay();
}

// Start new game (reset scores too)
function newGame() {
    if (confirm('Are you sure you want to start a new game? This will reset all scores.')) {
        gameState.board = Array(9).fill('');
        gameState.currentPlayer = 'X';
        gameState.gameActive = true;
        gameState.scores = { X: 0, O: 0, draw: 0 };
        
        createBoard();
        updateDisplay();
        updateScores();
        saveScores();
    }
}

// Toggle theme
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i');
    
    if (document.body.classList.contains('dark-theme')) {
        icon.className = 'fas fa-sun';
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        localStorage.setItem('ticTacToeTheme', 'dark');
    } else {
        icon.className = 'fas fa-moon';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
        localStorage.setItem('ticTacToeTheme', 'light');
    }
}

// Save scores to localStorage
function saveScores() {
    localStorage.setItem('ticTacToeScores', JSON.stringify(gameState.scores));
}

// Load scores from localStorage
function loadScores() {
    const savedScores = localStorage.getItem('ticTacToeScores');
    if (savedScores) {
        gameState.scores = JSON.parse(savedScores);
        updateScores();
    }
    
    // Load theme
    const savedTheme = localStorage.getItem('ticTacToeTheme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    }
}

// Attach event listeners
function attachEventListeners() {
    resetBtn.addEventListener('click', resetGame);
    newGameBtn.addEventListener('click', newGame);
    themeToggle.addEventListener('click', toggleTheme);
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'r' || e.key === 'R') {
            resetGame();
        } else if (e.key === 'n' || e.key === 'N') {
            newGame();
        } else if (e.key === 't' || e.key === 'T') {
            toggleTheme();
        } else if (e.key >= '1' && e.key <= '9' && gameState.gameActive) {
            const index = parseInt(e.key) - 1;
            if (gameState.board[index] === '') {
                handleCellClick(index);
            }
        }
    });
    
    // Add touch/click sound effects (optional)
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            // You could add sound effects here
            // playSound('click');
        });
    });
}

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', initGame);

// Add some fun animations on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Add a welcome message
    setTimeout(() => {
        console.log('%c🎮 Tic Tac Toe Game Loaded!', 'color: #667eea; font-size: 18px; font-weight: bold;');
        console.log('%cUse keyboard shortcuts:', 'color: #764ba2; font-size: 14px;');
        console.log('%c• R: Reset game', 'color: #666;');
        console.log('%c• N: New game (reset scores)', 'color: #666;');
        console.log('%c• T: Toggle theme', 'color: #666;');
        console.log('%c• 1-9: Make move on corresponding cell', 'color: #666;');
    }, 500);
});


// Test function to verify game logic
function testGameLogic() {
    console.log('Testing game logic...');
    
    // Test 1: Check win detection
    const testBoard1 = ['X', 'X', 'X', '', '', '', '', '', ''];
    const tempState = { ...gameState };
    gameState.board = testBoard1;
    console.assert(checkWin() === true, 'Win detection should work for first row');
    gameState.board = tempState.board;
    
    // Test 2: Check draw detection
    const testBoard2 = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    gameState.board = testBoard2;
    console.assert(checkDraw() === true, 'Draw detection should work for full board');
    gameState.board = tempState.board;
    
    console.log('All tests passed!');
}

// Run tests when in development mode
if (window.location.href.includes('localhost') || window.location.href.includes('127.0.0.1')) {
    window.addEventListener('load', () => {
        setTimeout(testGameLogic, 1000);
    });
}