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
function pewPewCollisions($laser, opponent, playerProperties, opponentProperties) {

    const laserTop = $laser.offset().top, laserBottom = $laser.offset().top + $laser.height(),
        laserLeft = $laser.offset().left, laserRight = $laser.offset().left + $laser.width(),
        opponentRect = opponent.getBoundingClientRect();

    if ((laserRight > opponentRect.left && laserRight < opponentRect.right &&
        laserTop > opponentRect.top && laserBottom < opponentRect.bottom) ||
        (laserLeft > opponentRect.right && laserLeft < opponentRect.left &&
            laserTop > opponentRect.top && laserBottom < opponentRect.bottom)) {

        playSoundEffect('hurt', 'wav');

        $laser.stop().remove();

        if (opponentProperties.health > 1) {

            opponentProperties.health--;
            $player1Health.text(playerOne.health);
            $player2Health.text(playerTwo.health);

        } else {

            opponentProperties.lives--;
            opponentProperties.health = 3;

            if (opponent === $player1 && playerOne.lives > 0) {

                $player1Health.text(3);

            } else if (playerTwo.lives > 0) {

                $player2Health.text(3);

            }

            $player1Lives.text(playerOne.lives);
            $player2Lives.text(playerTwo.lives);

            setTimeout(function () {
                reset(playerProperties);
            }, 20);
        }

    }
}