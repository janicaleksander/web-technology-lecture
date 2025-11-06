
// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------
const RANDOM_NUMBER_MULTIPLIER = 100;

// -----------------------------------------------------------------------------
// Global variables
// -----------------------------------------------------------------------------
let clickCount = 0;
let promptSum  = 0;

// -----------------------------------------------------------------------------
// Event listeners
// -----------------------------------------------------------------------------
window.addEventListener("load", function() {
    window.alert("Strona załadowana pomyślnie.");
});

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("randomButton").addEventListener("click", getRandomNumber);
})

// -----------------------------------------------------------------------------
// Functions
// -----------------------------------------------------------------------------
/**
 * Counts clicks.
 * Demonstrates usage of `document.getElementById()` and `.innerHTML`.
 * @returns {void}
 */
function countClicks() { 
    document.getElementById("clickCounter").innerHTML = `Licznik kliknięć:  ${++clickCount}`;
}

/**
 * Adds numbers given by user via window.prompt() and displays sum of 
 * all number provided by user during the session.
 * Demonstrates usage of `window.prompt()`, `window.alert()`, `parseFloat()`,
 * `.innerHTML` and `Math.round()`.
 * @returns {void}
 */
function addNumbers() {
    let a = window.prompt("Podaj pierwszą liczbę: ");
    let b = window.prompt("Podaj drugą liczbę:");

    if (isNumberValid(a) || isNumberValid(b)) {
        window.alert("Co najmniej jedna z podanych wartości nie jest liczbą!");
        return;
    }
    
    let sum = parseFloat(a) + parseFloat(b);
    promptSum += sum;

    window.alert("Suma = " + sum);
    document.getElementById("promptCounter").innerHTML = `Suma wszystkich podanych liczb:  ${Math.round((promptSum + Number.EPSILON) * 100) / 100}`;
}

/**
 * Returns random number within the [1-100] range.
 * Demonstrates usage of `Math.floor()` and `Math.random()`.
 * @returns {number}
 */
function getRandomNumber() {   
    let randomNumber = Math.floor(Math.random() * RANDOM_NUMBER_MULTIPLIER) + 1;
    document.getElementById("randomGenerator").innerHTML = `Wylosowana liczba: ${randomNumber}`;
    return randomNumber;
}

/**
 * Demonstrates usage of loops: `while`, `do-while` and `for`.
 * @returns {void}
 */
function testLoops() {
    let iterations = window.prompt("Podaj, ile ma być powtórzeń pętli:");

    // Test while loop
    let whileIter = 0;
    let whileTestResult = "While...";

    while (whileIter < iterations) {
        whileTestResult += ` ${whileIter++}`;
    }
    document.getElementById("whilePar").innerHTML = whileTestResult;

    // Test do-while loop
    let doWhileIter = 0;
    let doWhileTestResult = "Do...While...";

    do {
        doWhileTestResult += ` ${doWhileIter++}`;
    }
    while (doWhileIter < iterations);
    document.getElementById("doWhilePar").innerHTML = doWhileTestResult;

    // Test for loop
    let forTestResult = "For...";
    for (let i = 0; i < iterations; i++) {
        forTestResult += ` ${i}`;
    }
    document.getElementById("forPar").innerHTML = forTestResult;
}

/**
 * Displays alert message with response to the question about 
 * the number of voivodeships in Poland.
 * Demonstrates usage of `switch-case` and `parseInt()`.
 * @returns {void}
 */
function checkVoivodeshipNumber() {
    let num = parseInt(window.prompt("Podaj liczbę województw:"), 10);

    switch (num) {
        case 16:
            window.alert("Zgadza się, w Polsce jest 16 województw.");
            break;
        case 13:
            window.alert("Tyle jest landów terytorialnych w Niemczech, ale nie województw w Polsce.");
            break;
        default:
            window.alert("Co ty mówisz...");
    }
}

// -----------------------------------------------------------------------------
// Utility functions
// -----------------------------------------------------------------------------
/**
 * Checks if given number is valid.
 * @param {number} num 
 * @returns {boolean}
 */
function isNumberValid(num) {
    return isNaN(num) || num.length == 0;
}
