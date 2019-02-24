class Modal {

    constructor(message, proceed) {
        const modal = document.createElement('div'),
            body = document.getElementsByTagName('body')[0],
            boundEnterMethod = this.onEnter.bind(this);

        modal.setAttribute('class', 'modal');
        modal.setAttribute('style', `display: block; background: ${message.includes('Player 1') ? '#00c3e3' : '#ff4554'};`);
        modal.innerHTML = `<h2>${message}</h2> <button onclick="this.continue('${proceed}')">${proceed}</button>`;

        body.appendChild(modal);

        window.removeEventListener('keydown', keydown);
        window.removeEventListener('keyup', keyup);

        //This event listener is not getting removed properly.
        window.addEventListener('keydown', boundEnterMethod);

        this.html = modal;
        this.proceed = proceed;
        this.boundEnterMethod = boundEnterMethod;
    }

    onEnter(event) {
        if (event.key === 'Enter') {
            this.continue(this.proceed);
            window.removeEventListener('keydown', this.boundEnterMethod);
        }
    }

    continue(proceed) {

        if (proceed === 'Next Match') {
            playerOne.livesHTML.innerText = 3;
            playerOne.healthHTML.innerText = 3;
            playerTwo.livesHTML.innerText = 3;
            playerTwo.healthHTML.innerText = 3;
            playerOne.lives = 3;
            playerOne.health = 3;
            playerTwo.lives = 3;
            playerTwo.health = 3;

            const level = arena.level === 3 ? 1 : arena.level + 1;
            arena = new Arena(level);
        }

        const body = document.getElementsByTagName('body')[0],
            randomPlayerOneNumber = Math.floor(Math.random() * 2),
            randomPlayerTwoNumber = Math.floor(Math.random() * 2);

        keypress = {};

        playerOne.airborne = false;
        playerOne.direction = 'right';
        playerOne.speed = 2.1;
        playerOne.health = 3;
        playerOne.laserSpeed = 500;
        playerOne.healthHTML.innerText = 3;

        playerTwo.airborne = false;
        playerTwo.direction = 'left';
        playerTwo.speed = 2.1;
        playerTwo.health = 3;
        playerOne.laserSpeed = 500;
        playerTwo.healthHTML.innerText = 3;


        // CSS could be randomised to make the starts a little more interesting...?
        playerOne.html.style.top = randomPlayerOneNumber === 0 ? '40px' : randomPlayerOneNumber === 1 ? '260px' : '380px';
        playerOne.html.style.left = randomPlayerOneNumber === 0 ? '68px' : randomPlayerOneNumber === 1 ? '68px' : '15px';
        playerOne.html.style.height = '60px';

        playerTwo.html.style.top = randomPlayerTwoNumber === 0 ? '40px' : randomPlayerTwoNumber === 1 ? '260px' : '300px';
        playerTwo.html.style.left = randomPlayerTwoNumber === 0 ? '545px' : randomPlayerTwoNumber === 1 ? '545px' : '597px';
        playerTwo.html.style.height = '60px';

        body.removeChild(this.html);
        window.addEventListener('keydown', keydown);
        window.addEventListener('keyup', keyup);
    }
}