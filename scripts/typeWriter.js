let textField = document.querySelector("#playing-field-header");

message01 = "You will be playing Rock Paper Scissors against your web browser.";
message02 = "First to five wins.";

let output01 = document.createElement("p")
textField.appendChild(output01);
let output02 = document.createElement("p")
textField.appendChild(output02);

const delay = (ms) => {return new Promise(resolve => setTimeout(resolve, ms))};

async function typeWrite(input, destination) {
    for (letter of input) {
        destination.textContent += letter;
        await delay(50);
    }
}

async function loadEvent() {
    typeWrite(message01, output01);
    await delay(3600);
    typeWrite(message02, output02);
}

document.addEventListener("load", loadEvent());