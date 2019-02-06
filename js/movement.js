// Change player1/2's CSS based on their direction.

function playerDirection(keyCode1, keyCode2, player) {

    if (keypress[keyCode1] && keyCode1 === 'a') {
        playerDirectionCSS('left', player);
    } else if (keypress[keyCode2] && keyCode2 === 'd') {
        playerDirectionCSS('right', player);
    } else if (keypress[keyCode1] && keyCode1 === 'ArrowLeft') {
        playerDirectionCSS('left', player);
    } else if (keypress[keyCode2] && keyCode2 === 'ArrowRight') {
        playerDirectionCSS('right', player);
    }

    return player.speed;
}


// Moves player left/right
function newPositionX(oldPosition, keyCode1, keyCode2, player) {

    const newPositionX = parseFloat(oldPosition) -
        (keypress[keyCode1] ? playerDirection(keyCode1, keyCode2, player) : 0) +
        (keypress[keyCode2] ? playerDirection(keyCode1, keyCode2, player) : 0);

    if (newPositionX <= 0) {
        return 0;
    } else if (newPositionX >= playableWidth) {
        return playableWidth;
    } else {
        return newPositionX;
    }
}


// Just does gravity
function newPositionY(oldPosition, player) {

    const newPositionY = parseFloat(oldPosition) + (player.airborne ? 1 : 0);

    if (newPositionY >= player.playableHeight()) {

        return player.playableHeight();

    } else {

        return newPositionY;
    }
}