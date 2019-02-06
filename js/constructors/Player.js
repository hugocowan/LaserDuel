//Player constructor function.

function Player(
    name,
    direction,
    airborne = false,
    noLasers = true,
    health = 3,
    lives = 3,
    laserSpeed = 500,
    speed = 0.75,
    jumpHeight = 110
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


    this.body = document.getElementsByClassName(`${this.name === 'Player 1' ? 'player one' : 'player two'}`)[0];
    this.$body = $(`${this.name === 'Player 1' ? '.player.one' : '.player.two'}`);
    this.$visor = $(`${this.name === 'Player 1' ? '.visor.one' : '.visor.two'}`);
    this.$gun = $(`${this.name === 'Player 1' ? '.gun.one' : '.gun.two'}`);
    this.$health = $(`${this.name === 'Player 1' ? '.player1.health' : '.player2.health'}`);
    this.$lives = $(`${this.name === 'Player 1' ? '.player1.lives' : '.player2.lives'}`);

    this.getRect = function() {
        return this.body.getBoundingClientRect();
    };

    this.playableHeight = function() {
        return arena.clientHeight - this.body.clientHeight;
    }
}