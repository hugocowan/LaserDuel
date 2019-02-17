//Reset lives/health/player positions

function score(opponent) {

    if (opponent.health > 1) {

        opponent.health--;
        playerOne.healthHTML.innerText = playerOne.health;
        playerTwo.healthHTML.innerText = playerTwo.health;
        return;

    }

    opponent.lives--;
    opponent.health = 3;
    opponent.healthHTML.innerText = 3;
    opponent.livesHTML.innerText = opponent.lives;

    if (playerTwo.lives === 0 || playerOne.lives === 0) {

        playerOne.healthHTML.innerText = 0;
        alert(`${opponent === playerOne ? playerTwo.name : playerOne.name} Wins the game!!! WOOOOOO`);
        playerOne.livesHTML.innerText = 3;
        playerOne.healthHTML.innerText = 3;
        playerTwo.livesHTML.innerText = 3;
        playerTwo.healthHTML.innerText = 3;
        playerOne.lives = 3;
        playerOne.health = 3;
        playerTwo.lives = 3;
        playerTwo.health = 3;

    } else {

        alert(`${opponent === playerOne ? playerTwo.name : playerOne.name} wins the round!`);
    }

    ball.html.remove();
    ball = new Ball();

    playerOne.airborne = false;
    playerOne.direction = 'right';
    playerOne.speed = 0.75;
    playerOne.health = 3;
    playerOne.laserSpeed = 500;
    playerOne.healthHTML.innerText = 3;

    playerTwo.airborne = false;
    playerTwo.direction = 'left';
    playerTwo.speed = 0.75;
    playerTwo.health = 3;
    playerOne.laserSpeed = 500;
    playerTwo.healthHTML.innerText = 3;


    // CSS could be randomised to make the starts a little more interesting...?
    playerOne.body.style.top = '300px';
    playerOne.body.style.left = '15px';
    playerOne.body.style.height = '60px';

    playerTwo.body.style.top = '300px';
    playerTwo.body.style.left = '597px';
    playerTwo.body.style.height = '60px';

}