const MAX_NUMBER_OF_GUESSES = 5;
let RANDOM_NUMBER_OF_MONTH;
let currNumberOfGuesses = 0;

function startRandomMonthGame() {
    resetGuessRandomNumberMonth();
}

function randomMonthAnswer() {
    return Math.floor(Math.random() * 12) + 1;
}

function numToMonthName(number) {
    const months = [
        "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];
    return months[number - 1] || "ERROR";
}

function goodGuess(nameOfMonth, correctAnswer) {
    return nameOfMonth === numToMonthName(correctAnswer);
}

function gameGuessRandomMonth() {
    const monthInputBox = document.getElementById("monthInputBox");
    const guessButton = document.getElementById("monthGuessButton");
    const currNumOfGuessesLeftText = document.getElementById("monthNumOfGuessesLeft");
    const resultText = document.getElementById("monthResult");

    currNumberOfGuesses++;

    if (currNumberOfGuesses <= MAX_NUMBER_OF_GUESSES) {
        if (goodGuess(monthInputBox.value.toUpperCase(), RANDOM_NUMBER_OF_MONTH)) {
            resultText.textContent = `The answer is ${numToMonthName(RANDOM_NUMBER_OF_MONTH)}.`;
            guessButton.disabled = true;
        } else if (currNumberOfGuesses === MAX_NUMBER_OF_GUESSES) {
            resultText.textContent = `No more guesses! It was ${numToMonthName(RANDOM_NUMBER_OF_MONTH)}.`;
            guessButton.disabled = true;
        } else {
            resultText.textContent = "Wrong guess! Try again.";
        }
    }

    currNumOfGuessesLeftText.textContent =
        `${MAX_NUMBER_OF_GUESSES - currNumberOfGuesses} left`;
}

function resetGuessRandomNumberMonth() {
    const guessButton = document.getElementById("monthGuessButton");
    const currNumOfGuessesLeftText = document.getElementById("monthNumOfGuessesLeft");
    const resultText = document.getElementById("monthResult");

    guessButton.disabled = false;
    currNumberOfGuesses = 0;
    RANDOM_NUMBER_OF_MONTH = randomMonthAnswer();
    currNumOfGuessesLeftText.textContent = `${MAX_NUMBER_OF_GUESSES} left`;
    resultText.textContent = "...";
}


let MAX_NUMBER_OF_ATTEMPTS;
let RANDOM_NUMBER;
let CURRENT_ATTEMPT = 0;

// Validate input number
function checkRange(number) {
    const num = Number(number);
    return num > 0 && Number.isInteger(num);
}


function setRange() {
    const inputNumber = document.getElementById("randomNumberAttemptsInputBox");
    const setRangeButton = document.getElementById("setNumberOfAttempts");
    const errorText = document.getElementById("setNumberOfAttemptsError");

    if (checkRange(inputNumber.value)) {
        MAX_NUMBER_OF_ATTEMPTS = Math.trunc(inputNumber.value);
        RANDOM_NUMBER = Math.floor(Math.random() * 100) + 1;
        CURRENT_ATTEMPT = 0;

        setRangeButton.disabled = true;
        guessingSection(true);
        errorText.textContent = "Game started!";
        updateGuessesLeft();
    } else {
        errorText.textContent = "Please enter a valid integer > 0!";
    }
}

function guessingSection(show) {
    const ids = [
        "randomNumberInputBox",
        "randomNumberGuessButton",
        "randomNumberResetButton",
        "randomNumberResult",
        "randomNumberNumOfGuessesLeft"
    ];
    ids.forEach(id => {
        document.getElementById(id).style.display = show ? "block" : "none";
    });

    if (!show) {
        document.getElementById("randomNumberResult").textContent = "...";
    }
}

function gameGuessRandomNumber() {
    const inputBox = document.getElementById("randomNumberInputBox");
    const resultText = document.getElementById("randomNumberResult");
    const guessButton = document.getElementById("randomNumberGuessButton");

    const userGuess = Number(inputBox.value);
    if (!checkRange(userGuess)) {
        resultText.textContent = "Please enter a valid integer!";
        return;
    }

    CURRENT_ATTEMPT++;
    updateGuessesLeft();

    if (userGuess === RANDOM_NUMBER) {
        resultText.textContent = `Correct! The number was ${RANDOM_NUMBER}.`;
        guessButton.disabled = true;
    } else if (userGuess > RANDOM_NUMBER) {
        resultText.textContent = "Too high!";
    } else {
        resultText.textContent = "Too low!";
    }

    if (CURRENT_ATTEMPT >= MAX_NUMBER_OF_ATTEMPTS && userGuess !== RANDOM_NUMBER) {
        resultText.textContent =  `No more attempts! The number was ${RANDOM_NUMBER}.`;
        guessButton.disabled = true;
    }
}

function updateGuessesLeft() {
    const guessesLeft = document.getElementById("randomNumberNumOfGuessesLeft");
    guessesLeft.textContent = `${MAX_NUMBER_OF_ATTEMPTS - CURRENT_ATTEMPT} left`;
}

function resetGuessRandomNumberGame() {
    const setButton = document.getElementById("setNumberOfAttempts");
    const resultText = document.getElementById("randomNumberResult");
    const guessButton = document.getElementById("randomNumberGuessButton");

    setButton.disabled = false;
    guessButton.disabled = false;
    guessingSection(false);
    resultText.textContent = "...";
    document.getElementById("randomNumberAttemptsInputBox").value = "";
}


document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("monthNumOfGuessesLeft")) {
        startRandomMonthGame();
    }
    if (document.getElementById("randomNumberAttemptsInputBox")) {
        guessingSection(false);
    }
});


//GAME 3
let N = 0;
let count = 0;
let sum = 0;

function startSumming() {

    const nInput = document.getElementById("nCount").value;
    let numbers = nInput.split(",")
    if (numbers.length !== 1){
        alert("Give only one number");

    }
    if (isNaN(nInput) || nInput <= 0 || !Number.isInteger(Number(nInput))) {
        alert("You have to input correct positive integer");
        return;
    }
    N = parseInt(nInput);



    count = 0;
    sum = 0;
    document.getElementById("sumResult").textContent = "";
    document.getElementById("progressText").textContent = "";

    document.getElementById("numberInputSection").style.display = "block";
}

function addNumber() {
    const numInput = document.getElementById("nextNumber");
    const value = parseFloat(numInput.value);

    if (isNaN(value)) {
        alert("Write correct number");
        return;
    }

    count++;
    sum += value;

    document.getElementById("progressText").textContent =
        `Inserted ${count} with ${N} numbers.`;

    document.getElementById("sumResult").textContent =
        `Current sum: ${sum}`;

    numInput.value = "";

    if (count === N) {
        alert(`Last sum of every  ${N} numbers is ${sum}.`);
        document.getElementById("numberInputSection").style.display = "none";
    }
}
