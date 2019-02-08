
class Ball {

    constructor() {

        const ball = document.createElement('div');
        ball.setAttribute('class', 'ball');

        arena.appendChild(ball);

        this.html = document.getElementsByClassName('ball')[0];
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
            player.showToast('Speed++');

        } else {

            player.laserSpeed = 300;
            player.showToast('Laser++');
        }
    }

}