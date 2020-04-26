// Your code goes here
const RANDOM_RANGE_STEP = 5;
const PRIZE_BASE = 100;
const PRIZE_MULTIPLIER = 2;
const USER_ATTEMPTS_MAX = 3;

// init game object and base props
let game = {
  currentRange: RANDOM_RANGE_STEP,
  guessNumber: 1,
  attempts: USER_ATTEMPTS_MAX,
  wallet: 0,
  levelMaxPrize: PRIZE_BASE,
  currentQuizPrice: PRIZE_BASE,

// instead of array, we configure method to calculate current quith price
//  recalculated every user input
  updateCurrentQuizPrice () {
    this.currentQuizPrice /= PRIZE_MULTIPLIER;
  },

  // set random integer in defined range
  setRandomNumber () {
    this.guessNumber = Math.floor(Math.random() * this.currentRange);
    console.log('game guess number: ' + this.guessNumber); // for debug
  },

// show wallet message and ask user for input number
  askUserNumber () {
    return prompt(`
Choose a roulette pocket number from 0 to ${ this.currentRange }\n
Attempts left: ${ this.attempts }
Total prize: ${ this.wallet }$
Possible prize on current attempt: ${ this.currentQuizPrice }$
`);
  },

  // update game props according to level up
  levelUp () {
    this.wallet += this.currentQuizPrice;
    this.levelMaxPrize *= PRIZE_MULTIPLIER;
    this.currentQuizPrice = this.levelMaxPrize;
    this.attempts = USER_ATTEMPTS_MAX;
    this.currentRange += RANDOM_RANGE_STEP;
    game.currentRange += RANDOM_RANGE_STEP;
    game.attempts = USER_ATTEMPTS_MAX;
  },

// run quiz while user have attempts
  runQuizz () {
    while (this.attempts > 0) {
      this.setRandomNumber();
      let userChoise = parseInt(this.askUserNumber());
      // update level if user was right, otherwise = minus attept
      // and recalculate prizes
      if (userChoise === game.guessNumber) {
        this.levelUp();
        return true;
      } else {
        this.attempts--;
        this.levelMaxPrize = PRIZE_BASE;
        this.updateCurrentQuizPrice();
      }
    }
    return false;
  },

  // reset stored game props
  reset () {
    this.currentRange = RANDOM_RANGE_STEP;
    this.guessNumber = 1;
    this.attempts = USER_ATTEMPTS_MAX;
    this.wallet = 0;
    this.currentQuizPrice = PRIZE_BASE;
  },

// main game stream.
  play (choice) {
    let userchoice = choice;
    while (userchoice) {
      let results = this.runQuizz();
      if (results) {
        userchoice = confirm(
          `Congratulation, you won!   Your prize is: ${ game.wallet }$. Do you want to continue?`
        );
        if (!userchoice) {
          alert(
            `Thank you for your participation. Your prize is: ${ game.wallet }$`);
        }
      } else {
        userchoice = confirm(
          `Thank you for your participation. Your prize is: ${ game.wallet }$. Do you want to continue?`
        );
        // reset data if user loose or exit
        this.reset();
      }
    }
    return userchoice;
  }
};

// main function, program starts here
function main () {
  let isRun = true;
  let choice = confirm('Do you want to play a game?');
  if (!choice) {
    alert('You did not become a billionaire, but can');
  } else {
    // Runs quiz while user accept
    while (isRun) {
      isRun = game.play(choice);
    }
  }

}

main();
