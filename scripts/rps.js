function getComputerChoice() { // Randomly choose between Rock, Paper, or Scissors
    switch (generateRandomValue()) { // Calls generateRandomValue to generate a random integer from 1 to 3
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
    if (playerSelection === computerSelection) { // Tie Scenario
        return `Tied! Both you and the computer chose ${computerSelection}`;
    } else if (playerSelection === "Rock" && computerSelection === "Scissors") { // Player wins: Rock beats Scissors
        return "You win! Rock beats Scissors"; 
    } else if (playerSelection === "Paper" && computerSelection === "Rock") { // Player wins: Paper beats Rock
        return "You win! Paper beats Rock";
    } else if (playerSelection === "Scissors" && computerSelection === "Paper") { // Player wins: Scissors beats Paper
        return "You win! Scissors beats Rock";
    } else { // All other scenarios are player loses
        return `You lose! ${computerSelection} beats ${playerSelection}`
    }
}

function generateRandomValue(ceiling = 3) { // Generates a random value between 1 and ceiling, default is 3
    return Math.floor(Math.random() * ceiling) + 1; // Add one ensures the value can reach the ceiling
}

function playGame() {
    console.clear();
    let roundsSelected = false; // Initialisation
    let numberOfRounds = 0; // Initialisation 
    while (!roundsSelected) { // While no max rounds selected
        numberOfRounds = parseInt(prompt("How many rounds of Rock Paper Scissors would you like to play?", 5)); // Prompt user input
        if (!isNaN(numberOfRounds) && numberOfRounds > 0) { // If user input is a number that is bigger than 0
            roundsSelected = true; // Change roundsSelected to true to break the while-loop
        } else {
            alert("Please input a positve integer.");
        }
    }
    for (let i = 1; i <= numberOfRounds; i++) { // For-loop from i = 1 to i = number of rounds chosen
        console.log(`Round ${i} of ${numberOfRounds}`); // Print out the round number
        let throwSelected = false;
        let playerSelection;
        while (!throwSelected) {
            playerSelection = prompt(`Round ${i} of ${numberOfRounds} \nPlease throw your throw by typing in rock, paper, or scissors.`);
            playerSelection = playerSelection.charAt(0).toUpperCase() + playerSelection.substring(1).toLowerCase(); // Parse player input to format Xxxxxx
            if (playerSelection === "Rock" || playerSelection === "Paper" || playerSelection === "Scissors") {// If formatted selection is one of the options
                throwSelected = true;
            } else {
                alert("Please input a correct option.");
            }
        }
        alert(playRound(playerSelection, getComputerChoice()));
    }
}

const debug = document.getElementById("debug"); // Takes #debug from the DOM
debug.addEventListener("click", playGame); // If #debug is pressed, log whatever I want to console