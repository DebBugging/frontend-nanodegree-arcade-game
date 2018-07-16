/* This is the engine to display the Canvas. It calls the render and update
entities methods */
var Engine = (function(global) {
  var doc = global.document,
    win = global.window,
    canvas = doc.createElement("canvas"),
    ctx = canvas.getContext("2d"),
    lastTime;

  canvas.width = 505;
  canvas.height = 606;
  doc.body.appendChild(canvas);

  //Get time delta information (dt)
  function main() {
    var now = Date.now(),
      dt = (now - lastTime) / 1000.0;

    update(dt);
    render();

    lastTime = now;

    win.requestAnimationFrame(main);
  }

  //This sets the lastTime variable for the initial loop
  function init() {
    lastTime = Date.now();
    main();
  }

  //Check any moves/ collisions of enemy and player
  function update(dt) {
    updateEntities(dt);
    checkCollisions();
  }

  //If collision of enemy and player occurs- reposition player back to the start
  function checkCollisions() {
    allEnemies.forEach(enemy => {
      if (enemy.checkCollisions(player) || player.checkCollisions(enemy)) {
        player.y = 5;
        player.x = 2;
        player.score = 0;
      }
    });
  }

  //Updates all objects
  function updateEntities(dt) {
    allEnemies.forEach(function(enemy) {
      enemy.update(dt);
    });
    player.update();
  }

  //This "draws" the screen using Canvas
  function render() {
    var rowImages = [
        "images/water-block.png", // Row 1 of 1 water
        "images/stone-block.png", // Row 1 of 3 of stone
        "images/stone-block.png", // Row 2 of 3 of stone
        "images/stone-block.png", // Row 3 of 3 of stone
        "images/grass-block.png", // Row 1 of 2 of grass
        "images/grass-block.png" // Row 2 of 2 of grass
      ],
      numRows = 6,
      numCols = 5,
      row,
      col;

    // Before drawing, clear existing canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Draw the correct image for that position
    for (row = 0; row < numRows; row++) {
      for (col = 0; col < numCols; col++) {
        ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
      }
    }

    renderEntities();
  }

  //Call the render function in class.js so that it "draws" the correct image
  function renderEntities() {
    allEnemies.forEach(function(enemy) {
      enemy.render();
    });
    player.render();
  }

  //This function does nothing but it could

  function reset() {
    location.reload();
  }

  //Load all images for the game
  Resources.load([
    "images/stone-block.png",
    "images/water-block.png",
    "images/grass-block.png",
    "images/enemy-bug.png",
    "images/char-boy.png",
    "images/char-cat-girl.png",
    "images/char-horn-girl.png",
    "images/char-pink-girl.png",
    "images/char-princess-girl.png"
  ]);
  Resources.onReady(init);

  //Assign the canvas context object to the global variable
  global.ctx = ctx;
})(this);
