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


    this.html = document.getElementsByClassName(`${this.name === 'Player1' ? 'player one' : 'player two'}`)[0];
    this.$html = $(`${this.name === 'Player1' ? '.player.one' : '.player.two'}`);
    this.$visor = $(`${this.name === 'Player1' ? '.visor.one' : '.visor.two'}`);
    this.$gun = $(`${this.name === 'Player1' ? '.gun.one' : '.gun.two'}`);
    this.$health = $(`${this.name === 'Player1' ? '.player1.health' : '.player2.health'}`);
    this.$lives = $(`${this.name === 'Player1' ? '.player1.lives' : '.player2.lives'}`);

    this.getRect = function() {
        return this.html.getBoundingClientRect();
    };
}