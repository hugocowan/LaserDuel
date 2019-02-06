//Player movement
function playerMovementCSS(keyCode1, keyCode2, player) {

    player.$body.css({
        left: function (index, oldPosition) {
            return newPositionX(oldPosition, keyCode1, keyCode2, player);
        },
        top: function (index, oldPosition) {
            return newPositionY(oldPosition, player);
        }
    });
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


// Change player's visual direction
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


//Change player's visual direction
function playerDirectionCSS(direction, player) {

    let playerCSS = { borderRadius: '15px 2px 0 0' },
        visorCSS = { left: '0px', borderRadius: '10px 2px 0 0' },
        gunCSS = { left: '-9px' };

    if (direction === 'right') {
        playerCSS = { borderRadius: '2px 15px 0 0' };
        visorCSS = { left: '3.6px', borderRadius: '2px 10px 0 0' };
        gunCSS = { left: '20px' };
    }

    player.direction = direction;
    player.$body.css(playerCSS);
    player.$visor.css(visorCSS);
    player.$gun.css(gunCSS);
}


//Jumping function
function characterJump(player) {

    player.airborne = true;
    player.$body.animate({
        'top': `-=${player.jumpHeight}px`
    });
}