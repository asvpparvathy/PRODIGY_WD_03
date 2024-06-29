document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restartButton');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    let isGameOver = false;

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

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });

    restartButton.addEventListener('click', restartGame);

    function handleClick(event) {
        const index = event.target.getAttribute('data-index');
        if (board[index] || isGameOver) return;

        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWinner(currentPlayer)) {
            alert(`${currentPlayer} wins!`);
            isGameOver = true;
        } else if (board.every(cell => cell)) {
            alert('It\'s a tie!');
            isGameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWinner(player) {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return board[index] === player;
            });
        });
    }

    function restartGame() {
        board = Array(9).fill(null);
        isGameOver = false;
        currentPlayer = 'X';
        cells.forEach(cell => {
            cell.textContent = '';
        });
    }
});

