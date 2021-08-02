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
    if (this.bordom > 9) {
      this.death = true;
    }
  }
}

let hasGameOver = false;

class Game {
  constructor(gameOverCallback) {
    this.tamagotchi = new Tamagotchi("Test");
    this.gameOverCallback = gameOverCallback;
    this.startGame();
  }

  ageUp() {
    const time = setInterval(() => {
      this.tamagotchi.age++;
      if (hasGameOver === true) {
        clearInterval(time);
      }
    }, 1000);
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

  startGame() {
    this.ageUp();
    this.dailyLife();
  }
}

const gameOver = () => console.log("hi"); // disable button,

const game = new Game(gameOver);

// after adding html, when user submit the name, the game start!
