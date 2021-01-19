// HTML elements
const statusDiv = document.querySelector(".status");
const resetDiv = document.querySelector(".reset");
const gameCell = document.querySelectorAll(".cell");

// Variables

let gameIsLive = true;
let xIsNext = true;
let winner = null;

// Constants

const xSymbol = 'X';
const oSymbol = 'O';

// Fonctions

const letterToSymbol = (letter) => letter === 'X' ? xSymbol : oSymbol;

const handleWin = (letter) => {
    gameIsLive = false;
    winner = letter;
    if(winner === 'X'){
        statusDiv.innerHTML = `${letterToSymbol(winner)} is the winner !!!`
    } else {
        statusDiv.innerHTML = `<span>${letterToSymbol(winner)} is the winner !!!</span>`
    }
}
const updateGame = () => {
    const topLeft = gameCell[0].classList[2];
    const topCenter = gameCell[1].classList[2];
    const topRight = gameCell[2].classList[2];
    const middleLeft = gameCell[3].classList[2];
    const middleCenter = gameCell[4].classList[2];
    const middleRight = gameCell[5].classList[2];
    const downLeft = gameCell[6].classList[2];
    const downCenter = gameCell[7].classList[2];
    const downRight = gameCell[8].classList[2];

    // Winner

if (topLeft && topLeft === topCenter && topLeft === topRight){
    handleWin(topLeft)
} else if ( middleLeft && middleLeft === middleCenter && middleLeft === middleRight) {
handleWin(middleLeft)
}else if (downLeft && downLeft === downCenter && downLeft === downRight){
    handleWin(downLeft)
} else if(topLeft && topLeft === middleLeft && topLeft === downLeft){
    handleWin(topLeft)
} else if (topCenter && topCenter === middleCenter && topCenter === downCenter){
    handleWin(topCenter)
} else if (topRight && topRight === middleRight && topRight === downRight){
    handleWin(topRight)
} else if (topLeft && topLeft === middleCenter && topLeft === downRight){
    handleWin(topLeft)
} else if (topRight && topRight === middleCenter && topRight === downLeft){
    handleWin(topRight)
} else if (topLeft && topCenter && topLeft ===topRight && middleLeft && middleCenter && middleRight && downLeft && downCenter && downRight){
    gameIsLive = false;
    statusDiv.innerHTML = 'Game is tied';
} else {
    xIsNext = !xIsNext;
    if (xIsNext){
        statusDiv.innerHTML =`${xSymbol} is next`;
    } else {
        statusDiv.innerHTML = `${oSymbol} is next`;
    }
}
};




// Handlers

const handleReset = (e) => {
    xIsNext = true;
    statusDiv.innerHTML = `${xSymbol} is next`;
    for (const cellDiv of gameCell){
        cellDiv.classList.remove('X');
        cellDiv.classList.remove('O');
    }
}

const handleCellClick = (e) => {
    const classList = e.target.classList
    const location = classList[1];

    if (classList[2] === 'X' || classList[2] === 'O'){
        return;
    }

if (xIsNext){
    classList.add("X");
    updateGame();
} else {
    classList.add("O");
    updateGame();
}
}


// Event listeners

resetDiv.addEventListener("click", handleReset);

for (const cellDiv of gameCell){
    cellDiv.addEventListener("click", handleCellClick);
}