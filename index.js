const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

// winning positions
const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // corrected from [0, 3, 5] to [0, 3, 6]
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// lets create a function that initialise the game 
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    // Ui me bhi empty karna hai 
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList.remove("win"); // remove win highlighting when restarting
    });
    newGameBtn.classList.remove("active");
    gameinfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

// to swap the turn of player
function swapTurn() {
    if (currentPlayer == "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }

    // UI Upadte 
    gameinfo.innerText = `Current Player - ${currentPlayer}`;
}

// check if game is over or not
function checkGameOver() {
    let answer = "";
    winningPosition.forEach((position) => {
        // all the 3 boxes should be non-empty and exactly same in value 
        if (
            gameGrid[position[0]] !== "" &&
            gameGrid[position[0]] === gameGrid[position[1]] &&
            gameGrid[position[0]] === gameGrid[position[2]]
        ) {
            //check if winner is X or O
            if (gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "O";

            // disable the pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            // now we know X/O is winner 
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // it means we have a winner 
    if (answer !== "") {
        gameinfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // we know no winner found let's check whether there is tie 
    let fillcount = 0;
    gameGrid.forEach((box) => {
        if (box !== "")
            fillcount++;
    });

    if (fillcount === 9) {
        gameinfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}

// handle click on boxes
function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        // check has someone won the game ?
        checkGameOver();

        // swap the turn
        if (!newGameBtn.classList.contains("active")) {
            swapTurn();
        }
    }
}

// add click event on each box
boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    });
});

// new game button event
newGameBtn.addEventListener('click', initGame);
