class Laser {

    constructor(playerGunLeft, playerGunTop) {

        const laser = document.createElement('div');
        laser.setAttribute('class', 'laser');
        laser.setAttribute('style', `left: ${playerGunLeft}px; top: ${playerGunTop}px`);

        arena.getHTML().appendChild(laser);

        this.html = document.getElementsByClassName('laser')[0];
        this.$body = $('.laser');
    }


    getRect() {
        return this.html.getBoundingClientRect();
    }


    getHTML() {
        return this.html;
    }

}