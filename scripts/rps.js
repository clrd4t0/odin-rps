// Gameplay related variables and functions

function getComputerChoice() { 
    switch (generateRandomValue()) { 
        case 1:
            return "rock"; 
            break;
        case 2: 
            return "paper"; 
            break;
        case 3: 
            return "scissors"; 
    }
}

let computerLives = 5;
let playerLives = 5;

function evaluateWinner(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return "tie";
    } else if (playerSelection === "rock" && computerSelection === "scissors") { 
        return "player-wins"; 
    } else if (playerSelection === "paper" && computerSelection === "rock") {
        return "player-wins";
    } else if (playerSelection === "scissors" && computerSelection === "paper") {
        return "player-wins";
    } else { // All other scenarios are player loses
        return "player-loses";
    }
}

function removeOneLive(loser) {
    let losingSide;
    if (loser === "player") {
        heartToChange = document.querySelector(`#player-side #lives-p${playerLives}`);
    } else {
        heartToChange = document.querySelector(`#computer-side #lives-p${computerLives}`);
    }
    heartToChange.src = "images/badHeart.png";
    (loser === "player") ? playerLives-- : computerLives--;
    console.log(`Player: ${playerLives}; Computer: ${computerLives}`);
    if (playerLives === 0) playerLoses();
    else if (computerLives === 0) playerWins();
}

function playerWins() {
    toggleThrowsDisable();
    winEndingPopup.classList.toggle("popup-visible");
}

function playerLoses() {
    toggleThrowsDisable();
    loseEndingPopup.classList.toggle("popup-visible");
}

function generateRandomValue(ceiling = 3) { 
    return Math.floor(Math.random() * ceiling) + 1; // Add one ensures the value can reach the ceiling
}

async function playGame(playerThrow) {
    allPlayerThrows.forEach((option) => {
        if (option.id !== playerThrow) {
            option.classList.toggle("disabled");
        } else {
            option.classList.toggle("active-disabled");
        }
    }); 
    playerHeader.textContent = `You chose ${playerThrow}`;
    let computerChoice = getComputerChoice();
    displayComputerChoice(computerChoice);
    roundResult = evaluateWinner(playerThrow, computerChoice);
    if (roundResult === "player-wins") {
        removeOneLive("computer");
        togglePlayerThrowBorder(playerThrow, roundResult);
        toggleComputerThrowBorder(roundResult);
        await announceRoundWin();
        togglePlayerThrowBorder(playerThrow, roundResult);
        toggleComputerThrowBorder(roundResult);
    } else if (roundResult === "player-loses") {
        removeOneLive("player");
        togglePlayerThrowBorder(playerThrow, roundResult);
        toggleComputerThrowBorder(roundResult);
        await announceRoundLose();
        togglePlayerThrowBorder(playerThrow, roundResult);
        toggleComputerThrowBorder(roundResult);
    } else {
        togglePlayerThrowBorder(playerThrow, roundResult);
        toggleComputerThrowBorder(roundResult);
        await announceRoundTie();
        togglePlayerThrowBorder(playerThrow, roundResult);
        toggleComputerThrowBorder(roundResult);
    }
    allPlayerThrows.forEach((option) => {
        if (option.id !== playerThrow) {
            option.classList.toggle("disabled");
        } else {
            option.classList.toggle("active-disabled");
        }
    }); 
    playerHeader.textContent = "Please choose your throw:"
    displayComputerChoice();
}

// DOM related variables and functions

const computerOutput = document.querySelector("#computer-output img");

const allPlayerThrows = document.querySelectorAll("#player-side .throw")
const computerThrows = document.querySelector("#computer-side .throw");

const rockButton = document.querySelector(".throw#rock");
rockButton.addEventListener("click", () => playGame("rock"));

const paperButton = document.querySelector(".throw#paper");
paperButton.addEventListener("click", () => playGame("paper"));

const scissorsButton = document.querySelector(".throw#scissors");
scissorsButton.addEventListener("click", () => playGame("scissors"));

const announcementsContainer = document.querySelector("#announcements-container");
const announcementsField = document.querySelector("#announcements");

const computerHeader = document.querySelector("#computer-side .throw-container-header");
const playerHeader = document.querySelector("#player-side .throw-container-header");

const popupContainer = document.querySelector("#endgame-popup");
const winEndingPopup = document.querySelector("#win-ending");
const loseEndingPopup = document.querySelector("#lose-ending");

const resetButtons = document.querySelectorAll(".reset");

resetButtons.forEach((button) => {
    button.addEventListener("click", reset);
});

function reset(){
    winEndingPopup.classList.remove("popup-visible");
    loseEndingPopup.classList.remove("popup-visible");
    toggleThrowsDisable();
    hearts = document.querySelectorAll(".lives-container img");
    hearts.forEach((heart) => {heart.src = "images/goodHeart.png"});
    computerLives = 5;
    playerLives = 5;
}

function displayComputerChoice(choice = "choosing") {
    if (choice === "choosing") {
        computerHeader.textContent = "Computer is choosing...";
    } else {
        computerHeader.textContent = `Computer chose ${choice}`;
    }
    computerOutput.src = `images/${choice}.png`;
}

function togglePlayerThrowBorder(choice, winOrLose) {
    let borderClass;
    switch (winOrLose) {
        case "player-wins":
            borderClass = "winning-throw";
            break;
        case "player-loses":
            borderClass = "losing-throw";
            break;
        default:
            borderClass = "tying-throw"
    }
    allPlayerThrows.forEach((option) => {
        if (option.id === choice) {
            option.classList.toggle(borderClass);
        }
    });
}

function toggleComputerThrowBorder(winOrLose) {
    switch (winOrLose) {
        case "player-wins":
            borderClass = "losing-throw";
            break;
        case "player-loses":
            borderClass = "winning-throw";
            break;
        default:
            borderClass = "tying-throw"
    }
    computerThrows.classList.toggle(borderClass);
}

async function announceRoundWin() {
    announcementsField.textContent = "You win!";
    announcementsContainer.style.backgroundColor = "rgb(3, 169, 20)";
    await sleep(3000);
    for (let i = 100; i >= 0; i--) {
        announcementsContainer.style.opacity = i / 100;
        await sleep(2);
    }
    announcementsField.textContent = "";
    announcementsContainer.style.removeProperty("background-color");
    announcementsContainer.style.removeProperty("opacity");
}

async function announceRoundLose() {
    announcementsField.textContent = "You lose!";
    announcementsContainer.style.backgroundColor = "rgb(165, 42, 42)";
    await sleep(3000);
    for (let i = 100; i >= 0; i--) {
        announcementsContainer.style.opacity = i / 100;
        await sleep(2);
    }
    announcementsField.textContent = "";
    announcementsContainer.style.removeProperty("background-color");
    announcementsContainer.style.removeProperty("opacity");
}

async function announceRoundTie() {
    announcementsField.textContent = "Tie!";
    announcementsContainer.style.backgroundColor = "rgb(178, 178, 40)";
    await sleep(3000);
    for (let i = 100; i >= 0; i--) {
        announcementsContainer.style.opacity = i / 100;
        await sleep(2);
    }
    announcementsField.textContent = "";
    announcementsContainer.style.removeProperty("background-color");
    announcementsContainer.style.removeProperty("opacity");
}

function toggleThrowsDisable() {
    document.querySelector("#player-side").classList.toggle("disabled");
}

const sleep = (ms) => {return new Promise(resolve => setTimeout(resolve, ms))};