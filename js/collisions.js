//Movement collision function.

function playerCollisions(player, playerProperties, opponentProperties) {

    const playerRect = player.getBoundingClientRect();

    for (let i = 0; i < platforms.length; i++) {

        const platformRect = platforms[i].getBoundingClientRect();

        if (playerRect.left < platformRect.right &&
            playerRect.right > platformRect.left &&
            playerRect.top < platformRect.bottom &&
            playerRect.bottom === platformRect.top) {

            playerProperties.airborne = false;

            break;
        }

        // makes airborne false if player is at ground level (560px).
        playerProperties.airborne = playerRect.bottom !== 560;
    }
    // if(playerRect.left < ballRect.right && playerRect.right > ballRect.left &&
    //   playerRect.top < ballRect.bottom && playerRect.bottom > ballRect.top){
    //
    //   console.log('It Happened!!');
    //   $ball.remove();
    //   opponent.speed = 1;
    // }
}



//Laser collisions
function pewPewCollisions($laser, opponent) {

    const laserTop = $laser.offset().top, laserBottom = $laser.offset().top + $laser.height(),
        laserLeft = $laser.offset().left, laserRight = $laser.offset().left + $laser.width(),
        opponentRect = opponent.html.getBoundingClientRect();

    if ((laserRight > opponentRect.left && laserRight < opponentRect.right &&
        laserTop > opponentRect.top && laserBottom < opponentRect.bottom) ||
        (laserLeft > opponentRect.right && laserLeft < opponentRect.left &&
            laserTop > opponentRect.top && laserBottom < opponentRect.bottom)) {

        playSoundEffect('hurt', 'wav');

        $laser.stop().remove();

        if (opponent.health > 1) {

            opponent.health--;
            playerOne.$health.text(playerOne.health);
            playerTwo.$health.text(playerTwo.health);

        } else {

            opponent.lives--;
            opponent.health = 3;

            if (opponent === playerOne && playerOne.lives > 0) {

                playerOne.$health.text(3);

            } else if (playerTwo.lives > 0) {

                playerTwo.$health.text(3);

            }

            $player1Lives.text(playerOne.lives);
            $player2Lives.text(playerTwo.lives);

            setTimeout(function () {
                reset(opponent);
            }, 20);
        }

    }
}