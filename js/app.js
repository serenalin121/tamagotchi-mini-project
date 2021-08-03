/*      Plan
    1. write game logic in Javescript file
    2. add plain html
    3. style the file ( when Tamagotchi hit age 5, grow the size?)
*/

/* 
#1. Create a Tamagotchi class
    constructor:
      - name
      - Hunger (1-10 scale)
      - Sleepiness (1-10 scale)
      - Boredom (1-10 scale)
      - Age
    method:
      - feed your pet, (feed)
      - turn off the lights, (sleep)
      - play with your pet. (play)

#2. Game class
    - Increase your pet's age every x minutes
    - Increase your pet's Hunger, Sleepiness, and Bored metrics on an interval of your choosing.

Instatiate my Tamagochi

*/

class Tamagotchi {
  constructor(name) {
    this.name = name;
    this.hunger = 1;
    this.sleepiness = 1;
    this.boredom = 1;
    this.age = 1;
    this.death = false;
  }

  feed() {
    this.hunger--;
  }
  sleep() {
    this.sleepiness--;
  }
  play() {
    this.boredom--;
  }

  increaseHunger() {
    this.hunger++;
    if (this.hunger > 9) {
      this.death = true;
    }
  }

  increaseSleepiness() {
    this.sleepiness++;
    if (this.sleepiness > 9) {
      this.death = true;
    }
  }

  increaseBoredom() {
    this.boredom++;
    if (this.boredom > 9) {
      this.death = true;
    }
  }
}

let hasGameOver = false;

class Game {
  constructor(name, gameOverCallback) {
    this.tamagotchi = new Tamagotchi(name);
    this.gameOverCallback = gameOverCallback;
    this.startGame();
  }

  ageUp() {
    const time = setInterval(() => {
      this.tamagotchi.age++;
      document.querySelector(".age").innerText = this.tamagotchi.age;
      if (this.tamagotchi.death === true) {
        clearInterval(time);
      }
    }, 2000);
  }

  dailyLife() {
    const daily = setInterval(() => {
      this.tamagotchi.increaseHunger();
      this.tamagotchi.increaseSleepiness();
      this.tamagotchi.increaseBoredom();
      console.log(this.tamagotchi);
      if (this.tamagotchi.death === true) {
        clearInterval(daily);
        this.gameOverCallback();
      }
    }, 1000);
  }

  showDetails() {
    const details = setInterval(() => {
      const hunger = document.querySelector(".hunger");
      hunger.innerText = this.tamagotchi.hunger;
      const sleepiness = document.querySelector(".sleepiness");
      sleepiness.innerText = this.tamagotchi.sleepiness;
      const boredom = document.querySelector(".boredom");
      boredom.innerText = this.tamagotchi.boredom;
      if (this.tamagotchi.death === true) {
        clearInterval(details);
      }
    }, 500);
  }

  startGame() {
    this.ageUp();
    this.dailyLife();
    this.showDetails();
    this.toFeed();
    this.toSleep();
    this.toPlay();
  }

  toFeed() {
    const feed = document.querySelector(".feed");
    feed.addEventListener("click", () => this.tamagotchi.feed());
  }

  toSleep() {
    const sleep = document.querySelector(".sleep");
    sleep.addEventListener("click", () => this.tamagotchi.sleep());
  }

  toPlay() {
    const play = document.querySelector(".play");
    play.addEventListener("click", () => this.tamagotchi.play());
  }
}

// After the player enter the Tamagotchi's name, game begin!
const button = document.querySelector(".btn");
button.addEventListener("click", (e) => {
  e.preventDefault();
  const playerInput = document.querySelector(".name").value;
  document.querySelector(".t-name").innerText = playerInput;
  document.querySelector(".name").value = "";
  const gameOver = () => {
    console.log("Game Over");
    document.querySelector(".feed").disabled = true;
    document.querySelector(".sleep").disabled = true;
    document.querySelector(".play").disabled = true;
  }; // disable button,

  const game = new Game(playerInput, gameOver);
});
