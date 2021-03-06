//Laser function

function pewPew(key) {

    const shooter = ['Tab', 'e'].includes(key) ? playerOne : playerTwo,
        opponent = shooter === playerOne ? playerTwo : playerOne;

    if (!shooter.noLasers) {
        return;
    }

    const shooterRect = shooter.getRect(),
        arenaRect = shooter.html.parentNode.getBoundingClientRect(),
        playableWidth = arena.getPlayableWidth(shooter),
        playerGunLeft = shooterRect.left - arenaRect.left + (shooter.direction === 'right' ? 30 : -42),
        playerGunTop = shooterRect.top - arenaRect.top + 20,
        laser = new Laser(playerGunLeft, playerGunTop),
        laserDistance = shooter.direction === 'right' ? playerGunLeft + playableWidth : playerGunLeft - playableWidth;

    shooter.noLasers = false; //limit lasers

    playSoundEffect('laser', 'mp3');

    requestAnimationFrame(function () {
        laser.laserFrame(laser, shooter.direction, laserDistance, playerGunLeft, 0);
    });


    function laserCollisions() {

        pewPewCollisions(laser, opponent, shooter);

        laserCollisionsReq = requestAnimationFrame(laserCollisions);
    }

    let laserCollisionsReq = requestAnimationFrame(laserCollisions);

    // Stop laser collision detection after ${shooter.laserSpeed} ms
    setTimeout(function () {

        cancelAnimationFrame(laserCollisionsReq);
        shooter.noLasers = true; //Allow lasers

    }, shooter.laserSpeed);

}