let boxes = document.querySelectorAll(".box");
let restart = document.querySelector("#restart");
let message = document.querySelector(".message");
let playerForm = document.querySelector("#player-form");
let gameContainer = document.querySelector("#game-container");
let submitButton = document.querySelector("#submit");
let player1Input = document.querySelector("#player1");
let player2Input = document.querySelector("#player2");

let turnX = true; // Player1 (X) starts
let gameOver = false;

// Start Game on Submit
submitButton.addEventListener("click", () => {
    playerForm.classList.add("hide"); // Hide input form
    gameContainer.classList.remove("hide"); // Show game board

    gameOver = false; // Reset game state
    message.innerText = `Player1, you're up!`;
});

// Restart Game
restart.addEventListener("click", () => {
    turnX = true;
    gameOver = false;
    message.innerText = `Player1, you're up!`;

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
        let boxA = boxes[a].innerText;
        let boxB = boxes[b].innerText;
        let boxC = boxes[c].innerText;

        if (boxA !== "" && boxA === boxB && boxB === boxC) { // Ensuring non-empty and match
            let winner = boxA === "x" ? "Player1" : "Player2"; // Always show "Player1" or "Player2"
            message.innerText = `${winner} congratulations you won!`;
            gameOver = true;
            disableBoard();
            return;
        }
    }

    // Check for Draw
    if ([...boxes].every(box => box.innerText !== "")) {
        message.innerText = "It's a draw!";
        gameOver = true;
    }
};

// Disable Board After Game Ends
const disableBoard = () => {
    boxes.forEach((box) => (box.disabled = true));
};

// Box Click Event
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!gameOver && box.innerText === "") {
            box.innerText = turnX ? "x" : "o"; // Use uppercase X and O
            box.disabled = true;

            checkWinner(); // Check Winner AFTER updating the board

            if (!gameOver) {
                turnX = !turnX; // Switch turn after checking winner
                message.innerText = turnX ? `Player1, you're up!` : `Player2, you're up!`;
            }
        }
    });
});
