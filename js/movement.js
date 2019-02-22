//Player movement

function playerMovementCSS(keyCode1, keyCode2, player) {

    player.html.style.left = newPositionX(keyCode1, keyCode2, player) + 'px';
    player.html.style.top = newPositionY(player) + 'px';
}


// Moves player left/right
function newPositionX(keyCode1, keyCode2, player) {

    !player.html.style.left ? player.html.style.left = player.startingLeftCSS + 'px' : null;

    const newPositionX = parseFloat(player.html.style.left) -
        (keypress[keyCode1] ? playerDirection(keyCode1, keyCode2, player) : 0) +
        (keypress[keyCode2] ? playerDirection(keyCode1, keyCode2, player) : 0);

    if (newPositionX <= 0) {
        return 0;
    } else if (newPositionX >= Arena.getPlayableWidth()) {
        return Arena.getPlayableWidth();
    } else {
        return newPositionX;
    }
}


// Just does gravity
function newPositionY(player) {

    !player.html.style.top ? player.html.style.top = player.startingTopCSS + 'px' : null;

    let newPositionY = parseFloat(player.html.style.top) + (player.airborne ? player.fallSpeed : 0);

    if (newPositionY >= player.getPlayableHeight()) {

        return player.getPlayableHeight();

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

function playerDirectionCSS(direction, player) {

    let playerCSS = direction === 'left' ? '15px 2px 0 0' : '2px 15px 0 0',
        visorCSSLeft = direction === 'left' ? '0' : '3.6px',
        visorCSSBorderRadius = direction === 'left' ? '10px 2px 0 0' : '2px 10px 0 0',
        gunCSS = direction === 'left' ? '-9px' : '20px';

    player.direction = direction;
    player.gun.style.left = gunCSS;
    player.visor.style.left = visorCSSLeft;
    player.html.style.borderRadius = playerCSS;
    player.visor.style.borderRadius = visorCSSBorderRadius;
}

//player crouch function.
function crouchDown(player) {
    player.firstPress = player.firstPress === undefined;
    player.firstPress ? player.speed = player.speed * 2 / 3 : null;
    player.html.style.height = '30px';
    player.firstPress ? player.html.style.top = player.html.offsetTop + 30 + 'px' : null;
}

function crouchUp(player) {
    player.firstPress = undefined;
    player.speed = player.speed * 3 / 2;
    player.html.style.height = '60px';
    player.html.style.top = player.html.offsetTop - 30 + 'px';
}


//Jumping function
function characterJump(player) {

    !player.html.style.top ? player.html.style.top = player.startingTopCSS + 'px' : null;

    player.airborne = true;

    let originalTop = player.html.style.top,
        top = 0;

    function frame() {

        top < player.jumpHeight - 10 ? top += 5 : top += 4;

        let newTop = parseFloat(originalTop) - top;

        player.html.style.top = newTop + 'px'; // show frame

        if (top >= player.jumpHeight) { // check finish condition
            return;
        }

        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);

}