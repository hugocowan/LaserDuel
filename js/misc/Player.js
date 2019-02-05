//Could put methods here like getting player htmldocument, getBoundingClientRect, etc.

function Player(name, airborne, noLasers, direction, health, lives, laserSpeed, speed) {

    this.name = name;
    this.airborne = airborne;
    this.noLasers = noLasers;
    this.direction = direction;
    this.health = health;
    this.lives = lives;
    this.laserSpeed = laserSpeed;
    this.speed = speed;


    this.html = document.getElementsByClassName(`${this.name === 'player1' ? 'player one' : 'player two'}`)[0];
    this.jQuery = $(`${this.name === 'player1' ? '.player.one' : '.player.two'}`);
    this.$visor = $(`${this.name === 'player1' ? '.visor.one' : '.visor.two'}`);
    this.$gun = $(`${this.name === 'player1' ? '.gun.one' : '.gun.two'}`);
    this.$health = $(`${this.name === 'player1' ? '.player1.health' : '.player2.health'}`);
    this.$lives = $(`${this.name === 'player1' ? '.player1.lives' : '.player2.lives'}`);

    this.getRect = function() {
        return this.html.getBoundingClientRect();
    };
}