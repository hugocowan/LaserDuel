// Change player1/2's CSS based on their direction.

function playerDirection(keyCode1, keyCode2, playerProperties) {

    if (keypress[keyCode1] && keyCode1 === 'a') {
        playerDirectionCSS('left', playerProperties, $player1, $player1Visor, $player1Gun);
    } else if (keypress[keyCode2] && keyCode2 === 'd') {
        playerDirectionCSS('right', playerProperties, $player1, $player1Visor, $player1Gun);
    } else if (keypress[keyCode1] && keyCode1 === 'ArrowLeft') {
        playerDirectionCSS('left', playerProperties, $player2, $player2Visor, $player2Gun);
    } else if (keypress[keyCode2] && keyCode2 === 'ArrowRight') {
        playerDirectionCSS('right', playerProperties, $player2, $player2Visor, $player2Gun);
    }

    return playerProperties.speed;
}



// Moves player left/right
function newPositionX(oldPosition, keyCode1, keyCode2, playerProperties) {

    const newPositionX = parseFloat(oldPosition) -
        (keypress[keyCode1] ? playerDirection(keyCode1, keyCode2, playerProperties) : 0) +
        (keypress[keyCode2] ? playerDirection(keyCode1, keyCode2, playerProperties) : 0);

    if (newPositionX <= 0) {
        return 0;
    } else if (newPositionX >= playableWidth) {
        return playableWidth;
    } else {
        return newPositionX;
    }
}



// Just does gravity
function newPositionY(oldPosition, playerProperties) {

    const newPositionY = parseFloat(oldPosition) + (playerProperties.airborne ? playerProperties.speed * 1.25 : 0);

    // if(object.ducking && newPositionY >= playableHeight+30){
    //   console.log('he is crouching and on the ground');
    //   return playableHeight + 30;
    // } else
    if (newPositionY >= playableHeight) {
        // console.log('he is on the ground.');
        return playableHeight;
    } else {
        return newPositionY;
    }
}



//Movement Interval.

setInterval(function () {

    if (player1 === undefined || $player1 === undefined) {
        return;
    }

    playerCollisions(player1, playerOne, playerTwo);
    playerCollisions(player2, playerTwo, playerOne);

    playerMovementCSS($player1, 'a', 'd', playerOne);
    playerMovementCSS($player2, 'ArrowLeft', 'ArrowRight', playerTwo);

}, 15);