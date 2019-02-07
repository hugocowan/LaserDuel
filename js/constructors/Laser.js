class Laser {

    constructor(playerGunLeft, playerGunTop) {

        const laser = document.createElement('div');
        laser.setAttribute('class', 'laser');
        laser.setAttribute('style', `left: ${playerGunLeft}px; top: ${playerGunTop}px`);

        arena.appendChild(laser);

        this.html = document.getElementsByClassName('laser')[0];
        this.$body = $('.laser');
    }


    getRect() {
        return this.html.getBoundingClientRect();
    }



    getHTML() {
        return this.html;
    }

    static setPowerup(player) {

        const randomNumber = Math.floor(Math.random() * 10);

        if (randomNumber >= 4) {

            player.speed = 1;

        } else {

            player.laserSpeed = 300;
        }
    }

}