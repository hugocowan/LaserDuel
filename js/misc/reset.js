//Reset lives/health/player positions
function reset(player) {

    keyArray.forEach(function (keycode) {
        keypress[keycode] = false;
    });

    if (playerTwo.lives === 0 || playerOne.lives === 0) {

        playerOne.$health.text(0);
        alert(`${player.name} Wins the game!!! WOOOOOO`);
        playerOne.$lives.text(3);
        playerOne.$health.text(3);
        playerTwo.$lives.text(3);
        playerTwo.$health.text(3);
        playerOne.lives = 3;
        playerOne.health = 3;
        playerTwo.lives = 3;
        playerTwo.health = 3;

    } else {

        alert(`${player.name} wins the round!`);
    }

    playerOne.airborne = false;
    playerOne.direction = 'right';
    playerOne.speed = 2;
    playerOne.health = 3;
    playerOne.$health.text(3);

    playerTwo.airborne = false;
    playerTwo.direction = 'left';
    playerTwo.speed = 2;
    playerTwo.health = 3;
    playerTwo.$health.text(3);


    // CSS could be randomised to make the starts a little more interesting...?
    playerOne.$body.css({
        top: '300px',
        left: '15px'
    });

    playerTwo.$body.css({
        top: '300px',
        left: '597px'
    });
}