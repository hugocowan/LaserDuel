//Player constructor function.

function Player(
    name,
    direction,
    startingLeftCSS = null,
    airborne = false,
    noLasers = true,
    health = 3,
    lives = 3,
    laserSpeed = 500,
    speed = 0.75,
    jumpHeight = 110,
    startingTopCSS = 420,
) {

    this.name = name;
    this.airborne = airborne;
    this.noLasers = noLasers;
    this.direction = direction;
    this.health = health;
    this.lives = lives;
    this.laserSpeed = laserSpeed;
    this.jumpHeight = jumpHeight;
    this.speed = speed;
    this.startingLeftCSS = this.startingLeftCSS || this.name === 'Player 1' ? 15 : 597;
    this.startingTopCSS = startingTopCSS;


    this.body = document.getElementsByClassName(`${this.name === 'Player 1' ? 'player one' : 'player two'}`)[0];
    this.visor = document.getElementsByClassName(`${this.name === 'Player 1' ? 'visor one' : 'visor two'}`)[0];
    this.gun = document.getElementsByClassName(`${this.name === 'Player 1' ? 'gun one' : 'gun two'}`)[0];
    this.healthHTML = document.getElementsByClassName(`${this.name === 'Player 1' ? 'player1 health' : 'player2 health'}`)[0];
    this.livesHTML = document.getElementsByClassName(`${this.name === 'Player 1' ? 'player1 lives' : 'player2 lives'}`)[0];


    this.$body = $(`${this.name === 'Player 1' ? '.player.one' : '.player.two'}`);

    this.getRect = function() {
        return this.body.getBoundingClientRect();
    };

    this.playableHeight = function() {
        return arena.clientHeight - this.body.clientHeight;
    };
}