
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


}