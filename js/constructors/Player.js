//Player constructor function.

class Player {

    constructor(name, startingLeftCSS = null, startingTopCSS = null){

    this.name = name;
    this.airborne = false;
    this.noLasers = true;
    this.direction = this.name === 'Player 1' ? 'right' : 'left';
    this.health = 3;
    this.lives = 3;
    this.laserSpeed = 500;
    this.jumpHeight = 110;
    this.speed = 0.75;
    this.startingLeftCSS = startingLeftCSS || this.name === 'Player 1' ? 15 : 597;
    this.startingTopCSS = startingTopCSS || this.playableHeight();


    this.body = document.getElementsByClassName(`${this.name === 'Player 1' ? 'player one' : 'player two'}`)[0];
    this.visor = document.getElementsByClassName(`${this.name === 'Player 1' ? 'visor one' : 'visor two'}`)[0];
    this.gun = document.getElementsByClassName(`${this.name === 'Player 1' ? 'gun one' : 'gun two'}`)[0];
    this.healthHTML = document.getElementsByClassName(`${this.name === 'Player 1' ? 'player1 health' : 'player2 health'}`)[0];
    this.livesHTML = document.getElementsByClassName(`${this.name === 'Player 1' ? 'player1 lives' : 'player2 lives'}`)[0];


    this.$body = $(`${this.name === 'Player 1' ? '.player.one' : '.player.two'}`);
    }


    getRect() {
        return this.body.getBoundingClientRect();
    };

    showToast(text) {

        const toast = document.createElement('div');
        toast.setAttribute('class', 'toast');
        toast.innerText = text;

        this.body.appendChild(toast);

        setTimeout(function() {
            toast.remove();
        }, 1200);
    };

    playableHeight() {
        console.log(this.body);

        return arena.getHTML().clientHeight - this.body.clientHeight;
    };
}