let selectedRange = null;
let randomNumber = null;
let guessesLeft = 0;

//guess limits
const guessLimits = { 10: 3, 100: 7, 1000: 10 };

//js variable declarations
// select range and press play!
const getRange = document.querySelectorAll("input[name='range']");
const rangeSelector = document.getElementById("select-range");
const startBtn = document.getElementById("start-btn");
const startGame = document.getElementById("play-game");

// instructions and check guess
const gameInstruction = document.getElementById("instruction");
const checkBtn = document.getElementById("checkBtn");

// guess logistics
const guessInput = document.getElementById("guess-input");
const showGuessesLeft = document.getElementById("guesses-left");
const guessHistory = document.getElementById("guess-history");
const guessList = document.getElementById("guesses-list");

// guess feedback
const errorMsg = document.getElementById("error");
const hintMsg = document.getElementById("hint");

// end the game
const endgame = document.getElementById("endgame");
const endMsg = document.getElementById("end-msg");
const playAgain = document.getElementById("playAgainBtn");

//select range and set random number/guess limit

getRange.forEach(radio => {
    radio.addEventListener('change', () => {
        selectedRange = parseInt(radio.value);
        startBtn.disabled = false;

        randomNumber = Math.floor(Math.random() * (selectedRange - 1)) + 1;
        console.log(randomNumber);
        guessesLeft = guessLimits[selectedRange];
    });
});

//start the game!
startBtn.addEventListener('click', () => {
    // check for someone trying to break the game
    if (!selectedRange) {
        alert("Please select a range using the radio buttons.");
        return;
    }

    // add a fail-safe in case something happens and
    // the start buttons can still be clicked during the game
    getRange.forEach(r => r.disabled = true);
    startBtn.disabled = true;

    // display guessing game interface
    rangeSelector.classList.add('hidden');
    rangeSelector.classList.remove('fix-display');

    startGame.classList.remove('hidden');
    startGame.classList.add('fix-display');

    guessHistory.classList.remove('hidden');
    guessHistory.classList.add('fix-display');

    showGuessesLeft.textContent = `${guessesLeft}`;
    gameInstruction.textContent = `Guess a number between 1 and ${selectedRange}.`;
});

//check guess!
checkBtn.addEventListener("click", () => {
    // initialise error message, high/low text and make the guess readable as a number
    errorMsg.textContent = "";
    hintMsg.textContent = "";
    let guess = parseInt(guessInput.value);

    // fail-safe in case someone tries inputting a value outside range
    if (guess < 1 || guess > selectedRange || isNaN(guess)) {
        errorMsg.textContent = `Enter a valid number between 1 and ${selectedRange}.`;
        return;
    }

    // reocrd the guess in the HTML
    let li = document.createElement("li");
    li.innerHTML = guess;
    guessList.appendChild(li);
    guessesLeft--;
    showGuessesLeft.textContent = `${guessesLeft}`;

    // check guess
    if (guess < randomNumber) {
        hintMsg.textContent = "Too low! Try again.";
    } else if (guess > randomNumber) {
        hintMsg.textContent = "Too high! Try again.";
    } else {
        hintMsg.textContent = "Correct - well done!";
        endGame(true);
        return;
    }

    // if there are no guesses left, you lose!!
    if (guessesLeft === 0) {
        endGame(false);
    }
});

// end the game!
function endGame(won) {
    endgame.classList.remove("hidden");
    endMsg.textContent = won ?
        "Congratulations!" : "No more guesses left";
}

// reload the page if you wanna play again
playAgain.addEventListener("click", function () {
    location.reload();
})