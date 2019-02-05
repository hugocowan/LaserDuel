//Reset lives/health/player positions
function reset(playerProperties) {

    keyArray.forEach(function (keycode) {
        keypress[keycode] = false;
    });

    if (player2Properties.lives === 0 || player1Properties.lives === 0) {

        $player1Health.text(0);
        alert(`${playerProperties.name} Wins the game!!! WOOOOOO`);
        $player1Lives.text(3);
        $player1Health.text(3);
        $player2Lives.text(3);
        $player2Health.text(3);
        player1Properties.lives = 3;
        player1Properties.health = 3;
        player2Properties.lives = 3;
        player2Properties.health = 3;

    } else {

        alert(`${playerProperties.name} wins the round!`);
    }

    player1Properties.airborne = false;
    player1Properties.direction = 'right';
    player1Properties.speed = 2;
    player1Properties.health = 3;
    $player1Health.text(3);

    player2Properties.airborne = false;
    player2Properties.direction = 'left';
    player2Properties.speed = 2;
    player2Properties.health = 3;
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