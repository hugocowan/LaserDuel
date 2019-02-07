//Movement collision function.

function playerCollisions(player, opponent) {

    const playerRect = player.getRect(),
        ballRect = ball.getRect();

    for (let i = 0; i < platforms.length; i++) {

        const platformRect = platforms[i].getBoundingClientRect();
        
        if (playerRect.left < platformRect.right &&
            playerRect.right > platformRect.left &&
            playerRect.top < platformRect.bottom &&
            playerRect.bottom === platformRect.top) {

            player.airborne = false;

            break;
        }

        // makes airborne false if player is at ground level (560px).
        player.airborne = playerRect.bottom !== 560;
    }

    // For the ball
    if (playerRect.left < ballRect.right && playerRect.right > ballRect.left &&
        playerRect.top < ballRect.bottom && playerRect.bottom > ballRect.top) {

        Ball.setPowerup(player);
        arena.removeChild(ball.getHTML());

    }
}


//Laser collisions
function pewPewCollisions($laser, opponent) {

    const laserTop = $laser.offset().top, laserBottom = $laser.offset().top + $laser.height(),
        laserLeft = $laser.offset().left, laserRight = $laser.offset().left + $laser.width(),
        opponentRect = opponent.getRect();

    if ((laserRight > opponentRect.left && laserRight < opponentRect.right &&
        laserTop > opponentRect.top && laserBottom < opponentRect.bottom) ||
        (laserLeft > opponentRect.right && laserLeft < opponentRect.left &&
            laserTop > opponentRect.top && laserBottom < opponentRect.bottom)) {

        playSoundEffect('hurt', 'wav');

        $laser.stop().remove();

        //Logic for scoreboard/win condition. In a setTimeout to allow pain sound to run before the alert does.
        setTimeout(function () {
            score(opponent);
        }, 10);
    }
}