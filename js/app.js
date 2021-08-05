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
    if (this.hunger <= 0) {
      return;
    }
    this.hunger--;
  }

  sleep() {
    if (this.sleepiness <= 0) {
      return;
    }
    this.sleepiness--;
    this.sleeping = true;
  }

  play() {
    if (this.boredom <= 0) {
      return;
    }
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
    }, 3000);
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
    }, 2000);
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

    document.querySelector(".form").hidden = true;
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
        document.querySelector(".details-list").style.color = "white";
        this.tamagotchi.sleeping = true;
      } else {
        this.tamagotchi.sleeping = false;
        const background = document.querySelector(".square");
        background.style.backgroundImage = "";
        document.querySelector(".details-list").style.color = "black";
        this.toMove();
      }
    });
  }

  toPlay() {
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
    img.setAttribute("src", `images/dead 2.png`);
    // disable button
    document.querySelector(".feed").disabled = true;
    document.querySelector(".sleep").disabled = true;
    document.querySelector(".play").disabled = true;
    document.querySelector(".form").hidden = false;
  }
}

// After the player enter the Tamagotchi's name, game begin!
const button = document.querySelector(".btn");
button.addEventListener("click", (e) => {
  e.preventDefault();
  const playerInput = document.querySelector(".name").value;
  document.querySelector(".t-name").innerText = playerInput;
  document.querySelector(".name").value = "";

  // enable button
  document.querySelector(".feed").disabled = false;
  document.querySelector(".sleep").disabled = false;
  document.querySelector(".play").disabled = false;

  new Game(playerInput);
});
