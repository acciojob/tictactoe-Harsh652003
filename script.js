let boxes = document.querySelectorAll(".box");
let restart = document.querySelector("#restart");
let message = document.querySelector(".message");
let playerForm = document.querySelector("#player-form");
let gameContainer = document.querySelector("#game-container");
let submitButton = document.querySelector("#submit");
let player1Input = document.querySelector("#player1");
let player2Input = document.querySelector("#player2");

let player1 = "";
let player2 = "";
let turnX = true; // Player 1 (X) starts
let gameOver = false;

// Start Game on Submit
submitButton.addEventListener("click", () => {
    player1 = player1Input.value.trim() || "Player 1";
    player2 = player2Input.value.trim() || "Player 2";

    playerForm.classList.add("hide"); // Hide input form
    gameContainer.classList.remove("hide"); // Show game board

    gameOver = false; // Reset game state
    message.innerText = `${player1}, you're up!`;
});

// Restart Game
restart.addEventListener("click", () => {
    turnX = true;
    gameOver = false;
    message.innerText = `${player1}, you're up!`;

    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
});

// Winning Combinations
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// Check for Winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[b].innerText === boxes[c].innerText) {
            let winnerName = boxes[a].innerText === "x" ? player1 : player2;
            message.innerText = `${winnerName},congratulations you won!`;
            gameOver = true;
            disableBoard();
            return;
        }
    }

    // Check for Draw
    if ([...boxes].every(box => box.innerText !== "")) {
        message.innerText = "It's a draw! 🤝";
        gameOver = true;
    }
};

// Disable Board After Game Ends
const disableBoard = () => {
    boxes.forEach((box) => (box.disabled = true));
};

// Box Click Event
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (!gameOver && box.innerText === "") {
            box.innerText = turnX ? "x" : "o";
            box.disabled = true;
            checkWinner(); // Check Winner

            if (!gameOver) {
                turnX = !turnX;
                message.innerText = turnX ? `${player1}, you're up!` : `${player2}, you're up!`;
            }
        }
    });
});
