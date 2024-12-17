const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let minRange = 1;
let maxRange = 100;
let targetNumber;
let attempts;

function generateNumber() {
  return Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
}

function startGame() {
  console.clear();
  console.log("🎮 Welcome to the Number Guessing Game!");
  console.log(`Guess a number between ${minRange} and ${maxRange}.`);
  console.log("Type 'exit' anytime to quit.\n");

  targetNumber = generateNumber();
  attempts = 0;
  askForGuess();
}

function askForGuess() {
  rl.question("Enter your guess: ", (input) => {
    if (input.toLowerCase() === "exit") {
      console.log("👋 Thanks for playing. Goodbye!");
      rl.close();
      return;
    }

    const guess = parseInt(input);
    attempts++;

    if (isNaN(guess) || guess < minRange || guess > maxRange) {
      console.log("⚠️ Invalid input! Please enter a valid number.");
    } else if (guess < targetNumber) {
      console.log("📉 Too low! Try again.");
    } else if (guess > targetNumber) {
      console.log("📈 Too high! Try again.");
    } else {
      console.log(`🎉 Correct! You guessed it in ${attempts} attempts.`);
      replayGame();
      return;
    }

    askForGuess();
  });
}

function replayGame() {
  rl.question("Do you want to play again? (yes/no): ", (answer) => {
    if (answer.toLowerCase() === "yes") {
      startGame();
    } else {
      console.log("👋 Thank you for playing! Goodbye.");
      rl.close();
    }
  });
}

startGame();
