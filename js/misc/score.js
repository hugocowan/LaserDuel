//Reset lives/health/player positions

function score(opponent) {

    if (opponent.health > 1) {

        opponent.health--;
        playerOne.$health.text(playerOne.health);
        playerTwo.$health.text(playerTwo.health);
        return;

    }

    opponent.lives--;
    opponent.health = 3;
    opponent.$health.text(3);
    opponent.$lives.text(opponent.lives);

    keyArray = [];

    if (playerTwo.lives === 0 || playerOne.lives === 0) {

        playerOne.$health.text(0);
        alert(`${opponent === playerOne ? playerTwo.name : playerOne.name} Wins the game!!! WOOOOOO`);
        playerOne.$lives.text(3);
        playerOne.$health.text(3);
        playerTwo.$lives.text(3);
        playerTwo.$health.text(3);
        playerOne.lives = 3;
        playerOne.health = 3;
        playerTwo.lives = 3;
        playerTwo.health = 3;

    } else {

        alert(`${opponent === playerOne ? playerTwo.name : playerOne.name} wins the round!`);
    }

    playerOne.airborne = false;
    playerOne.direction = 'right';
    playerOne.speed = 0.75;
    playerOne.health = 3;
    playerOne.$health.text(3);

    playerTwo.airborne = false;
    playerTwo.direction = 'left';
    playerTwo.speed = 0.75;
    playerTwo.health = 3;
    playerTwo.$health.text(3);


    // CSS could be randomised to make the starts a little more interesting...?
    playerOne.$body.css({
        top: '300px',
        left: '15px',
        height: '60px',
    });

    playerTwo.$body.css({
        top: '300px',
        left: '597px',
        height: '60px',
    });
}