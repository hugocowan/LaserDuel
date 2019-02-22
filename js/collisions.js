//Movement collision function.

function playerCollisions(player, opponent) {

    const playerRect = player.getRect(),
        ballRect = ball.getRect() || ball.setRect(),
        arenaRect = arena.getRect() || arena.setRect();

    for (let i = 0; i < platforms.length; i++) {

        const platformRect = platforms[i].getRect() || platforms[i].setRect();

        if (playerRect.left < platformRect.right &&
            playerRect.right > platformRect.left &&
            playerRect.top < platformRect.bottom &&
            playerRect.bottom < platformRect.top + player.fallSpeed &&
            playerRect.bottom > platformRect.top - player.fallSpeed) {

            player.html.style.top = platformRect.top - arenaRect.top - player.html.clientHeight + 'px';
            player.airborne = false;

            break;
        }

        // makes airborne false if player is at ground level (560px).
        player.airborne = playerRect.bottom !== 560;
    }

    // For the ball
    if (ballRect && playerRect.left < ballRect.right && playerRect.right > ballRect.left &&
        playerRect.top < ballRect.bottom && playerRect.bottom > ballRect.top) {

        ball.setPowerup(player);
    }
}


//Laser collisions
function pewPewCollisions(laser, opponent) {

    const laserRect = laser.getRect(),
        opponentRect = opponent.getRect();

    if ((laserRect.right > opponentRect.left && laserRect.right < opponentRect.right &&
        laserRect.top > opponentRect.top && laserRect.bottom < opponentRect.bottom) ||
        (laserRect.left > opponentRect.right && laserRect.left < opponentRect.left &&
            laserRect.top > opponentRect.top && laserRect.bottom < opponentRect.bottom)) {

        playSoundEffect('hurt', 'wav');

        laser.html.remove();

        //Logic for scoreboard/win condition. In a setTimeout to allow pain sound to run before the alert does.
        setTimeout(function () {
            score(opponent);
        }, 20);
    }
}