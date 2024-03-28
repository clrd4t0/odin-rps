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
        return "Tie";
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
        }
    }); 
    computerChoice = getComputerChoice();
    console.log(computerChoice);
    // TODO: Update Computer Throw Image based on computer choice
    roundResult = evaluateWinner(playerThrow, computerChoice);
    if (roundResult === "player-wins") {
        removeOneLive("computer");
    } else if (roundResult === "player-loses") {
        removeOneLive("player");
    } else {
        alert("Tie!");
    }
    // TODO: Add middle announcements for all 3 cases above
    await sleep(3000);
    allPlayerThrows.forEach((option) => {
        if (option.id !== playerThrow) {
            option.classList.toggle("disabled");
        }
    }); 
}

// DOM related variables and functions

const allPlayerThrows = document.querySelectorAll("#player-side .throw")

const rockButton = document.querySelector(".throw#rock");
rockButton.addEventListener("click", () => playGame("rock"));

const paperButton = document.querySelector(".throw#paper");
paperButton.addEventListener("click", () => playGame("paper"));

const scissorsButton = document.querySelector(".throw#scissors");
scissorsButton.addEventListener("click", () => playGame("scissors"));

const announcementsContainer = document.querySelector("#announcements-container");
const announcementsField = document.querySelector("#announcements");

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