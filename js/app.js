// Enemies our player must avoid
var Enemy = function(y) {
    this.x=0;
    this.sprite = 'images/enemy-bug.png';
    this.y = y;
    this.speed = Math.floor(Math.random() * 3 + 2);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed;
    if(this.x > 500) {
        this.x = -100;
 }
};

// check if player and enemy collide at the "right" time (not to early or late)
function checkCollisions() {
    for (var i = 0; i < allEnemies.length; i++) {

        var xBuffer = 45;
        var yBuffer = 20;

        if (allEnemies[i].x - xBuffer <= player.x && allEnemies[i].x + xBuffer >= player.x) {
            if (allEnemies[i].y - yBuffer <= player.y && allEnemies[i].y + yBuffer >= player.y ) {
                player.reset();
            }
        }
        
    }
}

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player
var Player = function() {

    // character
     this.sprite = 'images/char-princess-girl.png';
     // placement
     this.x = 200;
     this.y = 400;
     this.width = 30;
     // movement
     this.dx = 100;
     this.dy = 80;

};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.update = function() {
    // Sets player boundries and resets when you win the game
    if (this.x > 400) {
        this.x = 400;
    } else if (this.x < 0) {
        this.x = 0;
    } else if (this.y > 400) {
        this.y = 400;
    } else if (this.y < 0) {
        this.y = 0
        alert("You made it!")
        this.reset();
    }
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
}

// Player movement keys
Player.prototype.handleInput = function(keys) {
    if ('up' === keys) {
        this.y -= this.dy;
    }
    if ('down' === keys) {
        this.y += this.dy;
    }
    if ('left' === keys) {
        this.x -= this.dx;
    }
    if ('right' === keys) {
        this.x += this.dx;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(60);
var enemy2 = new Enemy(140);
var enemy3 = new Enemy(220);

var allEnemies = [enemy1, enemy2, enemy3];


var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
