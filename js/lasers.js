//Laser function

function pewPew(shooter, opponent) {


    const shooterRect = shooter.getRect(),
        arenaRect = shooter.body.parentNode.getBoundingClientRect(),
        playerGunLeft = shooterRect.left - arenaRect.left + (shooter.direction === 'right' ? 30 : -42),
        playerGunTop = shooterRect.top - arenaRect.top + 20,
        laser = new Laser(playerGunLeft, playerGunTop),
        laserPathLeft = playerGunLeft - Arena.getPlayableWidth(),
        laserPathRight = playerGunLeft + Arena.getPlayableWidth();

    shooter.noLasers = false; //limit lasers

    laser.$body.animate({
        left: [shooter.direction === 'right' ? laserPathRight: laserPathLeft, 'linear']
    }, {
        'complete': function () {
            laser.$body.stop().remove();
        }
    });

    //Interval to run laser collisions every ms
    laserInterval = setInterval(function () {

        pewPewCollisions(laser.$body, opponent, shooter);

    }, 1);

    // Stop laser collision detection after ${shooter.laserSpeed} ms
    setTimeout(function () {

        clearInterval(laserInterval);
        shooter.noLasers = true; //Allow lasers

    }, shooter.laserSpeed);

}