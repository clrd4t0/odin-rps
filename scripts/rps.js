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

function generateRandomValue(ceiling = 3) { 
    return Math.floor(Math.random() * ceiling) + 1; // Add one ensures the value can reach the ceiling
}

function playGame() {
    console.clear();
    let numberOfRounds = 0; 
    while (true) { 
        numberOfRounds = parseInt(prompt("How many rounds of Rock Paper Scissors would you like to play?", 5)); 
        if (!isNaN(numberOfRounds) && numberOfRounds > 0) { 
            break;
        } else {
            alert("Please input a positve integer.");
        }
    }
    for (let i = 1; i <= numberOfRounds; i++) { 
        console.log(`Round ${i} of ${numberOfRounds}`);
        let playerSelection;
        while (true) {
            playerSelection = prompt(`Round ${i} of ${numberOfRounds} \nPlease throw your throw by typing in rock, paper, or scissors.`);
            playerSelection = playerSelection.charAt(0).toUpperCase() + playerSelection.substring(1).toLowerCase();
            if (playerSelection === "Rock" || playerSelection === "Paper" || playerSelection === "Scissors") {
                break;
            } else {
                alert("Please input a correct option.");
            }
        }
        alert(playRound(playerSelection, getComputerChoice()));
    }
}

const debug = document.getElementById("debug"); 
debug.addEventListener("click", playGame); 