//Make the the payer and enemy
const player = new Player();

const allEnemies = [...Array(3)].map((_, i) => new Enemy(0, i + 1));

// Make the modal
const modal = document.getElementsByClassName("modal")[0];

//Arrow keys to move player
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  //Start timer
  player.clicks++;

  if (player.clicks === 1) {
    player.timer = setInterval(function() {
      document.getElementsByClassName("time")[0].innerHTML = `Time: ${
        player.minutes
      }.${player.seconds}`;
      player.seconds++;
      if (player.seconds === 60) {
        player.minutes++;
        player.seconds = 0;
      }
    }, 1000);
  }

  player.handleInput(allowedKeys[e.keyCode]);
});

//Show and hide instructions when clicked
document
  .getElementById("instructions-button")
  .addEventListener("click", function(e) {
    document.getElementById("instructions-toggle").classList.toggle("open");
  });
