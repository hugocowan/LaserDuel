//Laser function

function pewPew(shooter, opponent, playerDirection, playerProperties, opponentProperties, timer) {

    const shooterRect = shooter.getBoundingClientRect(),
        arenaRect = shooter.parentNode.getBoundingClientRect(),
        playerGunLeft = shooterRect.left - arenaRect.left + (playerProperties.direction === 'right' ? 30 : -42),
        playerGunTop = shooterRect.top - arenaRect.top + 20,
        $laser = $('<div class="laser">'),
        laserPathLeft = playerGunLeft - 612,
        laserPathRight = playerGunLeft + 612;

    playerProperties.noLasers = false; //limit lasers

    $laser.css({
        left: playerGunLeft,
        top: playerGunTop
    });

    $laser.appendTo($('main')).animate({
        left: [playerDirection === 'right' ? laserPathRight: laserPathLeft, 'linear']
    }, {
        complete: function () {
            $laser.stop().remove();
        }
    });

    //Interval to run laser collisions every ms
    laserInterval = setInterval(function () {
        pewPewCollisions($laser, opponent, playerProperties, opponentProperties);
    }, 1);

    // Stop laser collision detection after ${timer} ms
    setTimeout(function () {

        clearInterval(laserInterval);
        // To delay next laser shot.
        playerProperties.noLasers = true; //Allow lasers
    }, timer);

}