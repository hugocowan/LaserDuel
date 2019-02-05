//Reset lives/health/player positions
function reset(playerProperties) {

    keyArray.forEach(function (keycode) {
        keypress[keycode] = false;
    });

    if (playerTwo.lives === 0 || playerOne.lives === 0) {

        $player1Health.text(0);
        alert(`${playerProperties.name} Wins the game!!! WOOOOOO`);
        $player1Lives.text(3);
        $player1Health.text(3);
        $player2Lives.text(3);
        $player2Health.text(3);
        playerOne.lives = 3;
        playerOne.health = 3;
        playerTwo.lives = 3;
        playerTwo.health = 3;

    } else {

        alert(`${playerProperties.name} wins the round!`);
    }

    playerOne.airborne = false;
    playerOne.direction = 'right';
    playerOne.speed = 2;
    playerOne.health = 3;
    $player1Health.text(3);

    playerTwo.airborne = false;
    playerTwo.direction = 'left';
    playerTwo.speed = 2;
    playerTwo.health = 3;
    $player2Health.text(3);


    // CSS could be randomised to make the starts a little more interesting...?
    $player1.css({
        top: '300px',
        left: '15px'
    });

    $player2.css({
        top: '300px',
        left: '597px'
    });
}