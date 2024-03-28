// Gameplay related variables and functions

function getComputerChoice() { 
    switch (generateRandomValue()) { 
        case 1: // 1 is Rock
            return "Rock"; 
            break;
        case 2: // 2 is Paper
            return "Paper"; 
            break;
        case 3: // 3 is Scissors
            return "Scissors"; 
    }
}

let computerLives = 5;
let playerLives = 5;

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return `Tied! Both you and the computer chose ${computerSelection}`;
    } else if (playerSelection === "Rock" && computerSelection === "Scissors") { 
        return "You win! Rock beats Scissors"; 
    } else if (playerSelection === "Paper" && computerSelection === "Rock") {
        return "You win! Paper beats Rock";
    } else if (playerSelection === "Scissors" && computerSelection === "Paper") {
        return "You win! Scissors beats Rock";
    } else { // All other scenarios are player loses
        return `You lose! ${computerSelection} beats ${playerSelection}`
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

function playGame() {
    // console.clear();
    // let numberOfRounds = 0; 
    // while (true) { 
    //     numberOfRounds = parseInt(prompt("How many rounds of Rock Paper Scissors would you like to play?", 5)); 
    //     if (!isNaN(numberOfRounds) && numberOfRounds > 0) { 
    //         break;
    //     } else {
    //         alert("Please input a positve integer.");
    //     }
    // }
    // for (let i = 1; i <= numberOfRounds; i++) { 
    //     console.log(`Round ${i} of ${numberOfRounds}`);
    //     let playerSelection;
    //     while (true) {
    //         playerSelection = prompt(`Round ${i} of ${numberOfRounds} \nPlease throw your throw by typing in rock, paper, or scissors.`);
    //         playerSelection = playerSelection.charAt(0).toUpperCase() + playerSelection.substring(1).toLowerCase();
    //         if (playerSelection === "Rock" || playerSelection === "Paper" || playerSelection === "Scissors") {
    //             break;
    //         } else {
    //             alert("Please input a correct option.");
    //         }
    //     }
    //     alert(playRound(playerSelection, getComputerChoice()));
    // } // Old routine commented and hidden for clarity purposes. Should be removed.

}

// DOM related variables and functions

const rockButton = document.querySelector(".throw#rock");
rockButton.addEventListener("click", () => alert("Rock was clicked!"));

const paperButton = document.querySelector(".throw#paper");
paperButton.addEventListener("click", () => alert("Paper was clicked!"));

const scissorsButton = document.querySelector(".throw#scissors");
scissorsButton.addEventListener("click", () => alert("Scissors was clicked!"));

const announcementsContainer = document.querySelector("#announcements-container");
const announcementsField = document.querySelector("#announcements");

const popupContainer = document.querySelector("#endgame-popup");
const winEndingPopup = document.querySelector("#win-ending");
const loseEndingPopup = document.querySelector("#lose-ending");

const resetButtons = document.querySelectorAll(".reset");

resetButtons.forEach((button) => {
    button.addEventListener("click", reset);
})

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