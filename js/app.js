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
    this.sleeping = false;
  }

  feed() {
    this.hunger--;
  }
  sleep() {
    this.sleepiness--;
    this.sleeping = true;
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
  constructor(name) {
    this.tamagotchi = new Tamagotchi(name);
    this.startGame();
  }

  ageUp() {
    document.querySelector(".age").innerText = 1;
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
        this.gameOver();
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
        return;
      }

      this.toMove();
      this.morph();
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
    sleep.addEventListener("click", () => {
      if (!this.tamagotchi.sleeping) {
        this.tamagotchi.sleep();
        const background = document.querySelector(".square");
        background.style.backgroundImage =
          "url(https://ak.picdn.net/shutterstock/videos/16739053/thumb/11.jpg";
        const img = document.querySelector(".character");
        img.setAttribute("src", "images/sleep.png");
        const character = document.querySelector(".tamagotchi");
        character.style.justifyContent = "center";
        character.style.alignItems = "center";
        this.tamagotchi.sleeping = true;
      } else {
        this.tamagotchi.sleeping = false;
        const background = document.querySelector(".square");
        background.style.backgroundImage = "";
        this.toMove();
      }
    });
  }

  toPlay() {
    s;
    const play = document.querySelector(".play");
    play.addEventListener("click", () => this.tamagotchi.play());
  }

  toMove() {
    // animate my tamagotchi
    if (this.tamagotchi.sleeping) {
      return;
    }
    const character = document.querySelector(".tamagotchi");
    const position = [
      "flex-start",
      "flex-end",
      "center",
      "space-between",
      "end",
    ][Math.floor(Math.random() * 5)];
    character.style.justifyContent = position;
    character.style.alignItems = position;

    const randomNum = Math.floor(Math.random() * 2) + 1;
    const img = document.querySelector(".character");
    img.setAttribute("src", `images/V${randomNum}.png`);
  }

  morph() {
    if (this.tamagotchi.age > 3) {
      const img = document.querySelector(".character");
      img.style.width = "220px";
      img.style.height = "220px";
    }
  }

  gameOver() {
    const img = document.querySelector(".character");
    img.setAttribute("src", `images/dead.png`);
    // disable button
    document.querySelector(".feed").disabled = true;
    document.querySelector(".sleep").disabled = true;
    document.querySelector(".play").disabled = true;
  }
}

// After the player enter the Tamagotchi's name, game begin!
const button = document.querySelector(".btn");
button.addEventListener("click", (e) => {
  e.preventDefault();
  const playerInput = document.querySelector(".name").value;
  document.querySelector(".t-name").innerText = playerInput;
  document.querySelector(".name").value = "";

  new Game(playerInput);
});
