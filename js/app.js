class Tamagotchi {
  constructor(name) {
    this.name = name;
    this.hunger = 1;
    this.sleepiness = 1;
    this.boredom = 1;
    this.age = 1;
    this.death = false;
    this.sleeping = false;
    this.happy = false;
    this.heartTimer = null;
  }

  feed() {
    if (this.hunger <= 0) {
      return;
    }
    this.hunger--;
    this.setHappy(true);
  }

  sleep() {
    if (this.sleepiness <= 0) {
      return;
    }
    this.sleepiness--;
    this.turnOffLight(true);
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
      this.hasDied();
    }
  }

  increaseSleepiness() {
    this.sleepiness++;
    if (this.sleepiness > 9) {
      this.hasDied();
    }
  }

  increaseBoredom() {
    this.boredom++;
    if (this.boredom > 9) {
      this.hasDied();
    }
  }

  setHappy(value) {
    this.happy = value;
    if (value) {
      this.showHeartTimer();
    } else {
      clearInterval(this.heartTimer);
    }
  }

  showHeartTimer() {
    if (this.heartTimer) {
      clearInterval(this.heartTimer);
    }
    this.heartTimer = setInterval(() => {
      const background = document.querySelector(".square");
      background.style.backgroundImage = "";
      document.querySelector(".details-list").style.color = "black";
      const img = document.querySelector(".character");
      const randomNum = Math.floor(Math.random() * 2) + 1;
      img.setAttribute("src", `images/heart ${randomNum}.png`);
      const character = document.querySelector(".tamagotchi");
      character.style.justifyContent = "center";
      character.style.alignItems = "center";
    }, 300);
  }

  turnOffLight(value) {
    this.sleeping = value;
    if (value) {
      const background = document.querySelector(".square");
      background.style.backgroundImage =
        "url(https://ak.picdn.net/shutterstock/videos/16739053/thumb/11.jpg";
      const img = document.querySelector(".character");
      img.setAttribute("src", "images/sleep.png");
      const character = document.querySelector(".tamagotchi");
      character.style.justifyContent = "center";
      character.style.alignItems = "center";
      document.querySelector(".details-list").style.color = "white";
      this.sleeping = true;
    } else {
      this.sleeping = false;
      const background = document.querySelector(".square");
      background.style.backgroundImage = "";
      document.querySelector(".details-list").style.color = "black";
    }
  }

  hasDied() {
    this.death = true;
    clearInterval(this.heartTimer);
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
      if (this.tamagotchi.death === true) {
        clearInterval(time);
        return;
      }
      this.tamagotchi.age++;
      document.querySelector(".age").innerText = this.tamagotchi.age;
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
    this.tamagotchi.turnOffLight(false);

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

    feed.addEventListener("click", () => {
      if (this.tamagotchi.sleeping) {
        this.tamagotchi.turnOffLight(false);
      }
      if (!this.tamagotchi.happy) {
        this.tamagotchi.feed();
      } else {
        this.tamagotchi.setHappy(false);
        this.toMove();
      }
    });
  }

  toSleep() {
    const sleep = document.querySelector(".sleep");
    sleep.addEventListener("click", () => {
      if (this.tamagotchi.happy) {
        this.tamagotchi.setHappy(false);
      }
      if (!this.tamagotchi.sleeping) {
        this.tamagotchi.sleep();
      } else {
        this.tamagotchi.turnOffLight(false);
        this.toMove();
      }
    });
  }

  toPlay() {
    const play = document.querySelector(".play");
    play.addEventListener("click", () => {
      if (this.tamagotchi.happy) {
        this.tamagotchi.setHappy(false);
      }
      if (this.tamagotchi.sleeping) {
        this.tamagotchi.turnOffLight(false);
      }
      this.tamagotchi.play();
    });
  }

  toMove() {
    // animate my tamagotchi
    if (this.tamagotchi.sleeping || this.tamagotchi.happy) {
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
const button = document.querySelector(".form");
button.addEventListener("submit", (e) => {
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
