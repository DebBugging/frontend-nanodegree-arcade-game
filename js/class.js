//This has all shared information for all classes
class Entity {
  constructor() {
    this.sprite = "images/";
    //Beginning position
    this.x = 2;
    this.y = 5;
  }

  //Keeps player from going off screen
  update(dt) {
    this.isOutOfBoundsX = this.x > 5;
    this.isOutOfBoundsY = this.y < 1;
  }

  //Sets the Canvas
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
  }

  //Resets player if collides with enemy
  checkCollisions(playerOrEnemy) {
    if (this.y === playerOrEnemy.y) {
      if (this.x >= playerOrEnemy.x - 0.5 && this.x <= playerOrEnemy.x + 0.5) {
        return true;
      }
    } else {
      return false;
    }
  }
}

//Player class takes everything from Entity and adds to it
class Player extends Entity {
  constructor() {
    super();
    this.sprite = "images/char-boy.png"; //Randomize characters
    this.ladybugs = [
      "images/char-boy.png",
      "images/char-cat-girl.png",
      "images/char-horn-girl.png",
      "images/char-pink-girl.png",
      "images/char-princess-girl.png"
    ];
    this.hero = this.ladybugs[Math.floor(Math.random() * this.ladybugs.length)];
    this.move = false;
    this.point = false;
    this.score = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.clicks = 0;
    //Set timer
    this.timer;

    //Click on "x" to close modal
    this.close = document.getElementsByClassName("close")[0];

    //Click on "Play Again" to reset game
    this.playAgain = document.getElementsByClassName("button")[0];

    //Congrats Change depending on score
    this.congrats = "Yay!";
  }

  //Ends turn when reaches end of water and starts over
  update(dt) {
    super.update();

    if (this.isOutOfBoundsY && !this.move && !this.point) {
      this.point = true;
      this.score++;
      this.x = 2;
      this.y = 5;
    } else {
      this.point = false;
    }

    if (this.point === true) {
      //Change ladybug
      this.hero = this.ladybugs[
        Math.floor(Math.random() * this.ladybugs.length)
      ];
    }

    //Keep score
    if (this.score >= 0) {
      document.getElementsByClassName("score")[0].innerHTML = `Saved: ${
        player.score
      } Ladybugs`;

      //Display score in modal
      document.getElementsByClassName("score")[1].innerHTML = `Saved: ${
        player.score
      } Ladybugs`;
    }

    // Change congrats per score
    if (this.score <= 2) {
      this.congrats = "Boo!";
    } else if (this.score <= 5) {
      this.congrats = "Meh..";
    } else if (this.score <= 8) {
      this.congrats = "Yay!";
    } else {
      this.congrats = "Wow!";
    }

    //Game over if reaches 1 minute
    if (this.minutes === 1) {
      //Open modal
      modal.style.display = "flex";
      //Stop timer
      clearInterval(this.timer);
      //Display time in modal
      document.getElementsByClassName("time")[1].innerHTML = `Time: ${
        player.minutes
      }.${player.seconds}`;

      //Change congrats depending on score
      document.getElementsByClassName("stack")[0].innerHTML = `${
        player.congrats
      }`;

      //Click button to play again
      this.playAgain.addEventListener("click", e => {
        location.reload();
      });

      //Close modal on X
      this.close.addEventListener("click", e => {
        location.reload();
      });
    }
  }

  //Stops moving for end of turn
  render() {
    super.render();
    this.move = false;
    ctx.drawImage(Resources.get(this.hero), this.x * 101, this.y * 83);
  }

  //Makes the player move with arrow keys
  handleInput(input) {
    switch (input) {
      case "left":
        this.x = this.x > 0 ? this.x - 1 : this.x;
        break;
      case "up":
        this.y = this.y > 0 ? this.y - 1 : this.y;
        break;
      case "right":
        this.x = this.x < 4 ? this.x + 1 : this.x;
        break;
      case "down":
        this.y = this.y < 5 ? this.y + 1 : this.y;
        break;
      default:
        break;
    }
    this.move = true;
  }
}

//Enemy class takes everything from Entity and adds to it
class Enemy extends Entity {
  constructor(x, y, speed = 0) {
    super();
    this.sprite += "enemy-bug.png";
    this.x = x;
    this.y = y;
    this.speed = speed + Math.floor(Math.random() * 3.47);
  }

  /* Enemy keeps looping back to start position and speeds are set */
  update(dt) {
    super.update();
    //Set speeds for bugs
    if (this.x < 15) {
      this.x = this.x + this.speed * dt;
    }

    //Makes loop and changes speed
    if (this.isOutOfBoundsX) {
      this.x = -1;
      this.speed = +Math.floor(Math.random() * 3.476);
    } else {
      this.x += dt;
    }
  }
}
