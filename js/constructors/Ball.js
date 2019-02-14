
class Ball {

    constructor() {

        const ball = document.createElement('div');
        ball.setAttribute('class', 'ball');

        const randomNumber = Math.floor(Math.random() * 10),
            arenaName = arena.html.className;

        if (arenaName === 'arena-1' && randomNumber <= 3) {
            ball.style.left = '28px';
            ball.style.top = '200px';
        } else if (arenaName === 'arena-1' && randomNumber >= 7) {
            ball.style.left = '570px';
            ball.style.top = '200px';
        }

        arena.html.appendChild(ball);

        this.html = ball;
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

        arena.html.removeChild(ball.getHTML());
    }

}