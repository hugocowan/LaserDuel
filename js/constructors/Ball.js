
class Ball {

    constructor(arena) {

        const ball = document.createElement('div'),
            oldBall = document.getElementsByClassName('ball')[0],
            randomNumber = Math.floor(Math.random() * 10),
            arenaName = arena.className;

        if (oldBall) {
            document.getElementsByTagName('main')[0].removeChild(oldBall);
        }

        ball.setAttribute('class', 'ball');

        randomNumber <= 3 ? ball.style.left =  '28px' : randomNumber >= 7 ? ball.style.left = '570px' : null;
        randomNumber <= 3 || randomNumber >= 7 ? ball.style.top = '200px' : null;

        arena.appendChild(ball);

        this.html = ball;
        this.rect = null;
    }


    getRect() {
        return this.rect;
    }

    setRect() {
        return this.rect = this.html.getBoundingClientRect();
    }

    setPowerup(player) {

        const randomNumber = Math.floor(Math.random() * 10);
        
        if (randomNumber >= 4) {

            player.speed = 2.6;
            player.showToast('Speed++');

        } else {

            player.laserSpeed = 300;
            player.showToast('Laser++');
        }

        this.html.remove();
        this.rect = null;
    }

}