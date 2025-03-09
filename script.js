let boxes = document.querySelectorAll(".box");
let restart = document.querySelector("#restart");
let message = document.querySelector(".messg");
let message1 = document.querySelector("#message");
let turnMessage = document.querySelector("#turn-message");
let playerForm = document.querySelector("#player-form");
let gameContainer = document.querySelector("#game-container"); // Correct
 // Ensure this exists
let submitButton = document.querySelector("#submit");
let player1Input = document.querySelector("#player-1");
let player2Input = document.querySelector("#player-2");

let player1 = "";
let player2 = "";
let turnO = true; // 'O' starts first
let gameOver = false; // To prevent moves after game ends

// Function to start the game after player names are entered
submitButton.addEventListener("click", () => {
    player1 = player1Input.value.trim() || "Player 1";
    player2 = player2Input.value.trim() || "Player 2";

    playerForm.classList.add("hide"); // Hide input form
    gameContainer.classList.remove("hide"); // Show game board

    gameOver = false; // Reset game state
    updateTurnMessage(); // Display initial turn message
});

// Function to update the message displaying whose turn it is
const updateTurnMessage = () => {
    if (!gameOver) {
        turnMessage.innerText = turnO ? `${player1}, it's your turn!` : `${player2}, it's your turn!`;
    }
};

// Restart Game Function
const restartGame = () => {
    turnO = true;
    gameOver = false; // Reset game state
    enable();
    message.classList.add("hide"); // Hide win/draw message
    updateTurnMessage(); // Reset turn message
};

// Winning Patterns
const gamePattern = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8],
    [2, 4, 6], [3, 4, 5], [6, 7, 8]
];

// Handling Box Clicks
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!gameOver && box.innerText === "") { // Only allow moves if game isn't over
            box.innerText = turnO ? "O" : "X";
            box.disabled = true;
            checkWinner(); // Check if there's a winner
            if (!gameOver) {
                turnO = !turnO; // Toggle turn
                updateTurnMessage();
            }
        }
    });
});

// Enable all boxes for a new game
const enable = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
    gameOver = false;
    updateTurnMessage();
};

// Disable all boxes when the game ends
const disable = () => {
    boxes.forEach((box) => box.disabled = true);
};

// Congratulating the Winner
const congratulation = (winner) => {
    let winnerName = winner === "O" ? player1 : player2;
    message1.innerText = `${winnerName}, congratulations! You won the match! 🎉`;
    message.classList.remove("hide");
    gameOver = true;
    disable();
};

// Check for Draw
const checkDraw = () => {
    return [...boxes].every(box => box.innerText !== "");
};

// Check for Winner
const checkWinner = () => {
    for (let pattern of gamePattern) {
        let [a, b, c] = pattern;
        let pos1 = boxes[a].innerText;
        let pos2 = boxes[b].innerText;
        let pos3 = boxes[c].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            congratulation(pos1);
            return;
        }
    }
    
    // If no winner and all boxes are filled, it's a draw
    if (checkDraw()) {
        message1.innerText = "It's a draw! 🤝";
        message.classList.remove("hide");
        gameOver = true;
    }
};

// Restart Button Click Event
restart.addEventListener("click", restartGame);
