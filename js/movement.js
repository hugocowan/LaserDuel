//Player movement

function playerMovementCSS(leftKey, rightKey, player) {

    player.html.style.left = newPositionX(leftKey, rightKey, player) + 'px';
    player.html.style.top = newPositionY(player) + 'px';
}


// Moves player left/right
function newPositionX(leftKey, rightKey, player) {

    !player.html.style.left ? player.html.style.left = player.startingLeftCSS + 'px' : null;

    const newPositionX = parseFloat(player.html.style.left) -
        (keypress[leftKey] ? playerDirection('left', player) : 0) +
        (keypress[rightKey] ? playerDirection('right', player) : 0);

    if (newPositionX <= 0) {
        return 0;
    } else if (newPositionX >= arena.getPlayableWidth(player)) {
        return arena.getPlayableWidth(player);
    } else {
        return newPositionX;
    }
}


// Just does gravity
function newPositionY(player) {

    !player.html.style.top ? player.html.style.top = arena.getPlayableHeight(player) + 'px' : null;

    let newPositionY = parseFloat(player.html.style.top) + (player.airborne ? player.fallSpeed : 0);

    if (newPositionY >= arena.getPlayableHeight(player)) {

        return arena.getPlayableHeight(player);

    } else {

        return newPositionY;
    }
}


// Change player's visual direction
function playerDirection(direction, player) {

    let playerCSS = direction === 'left' ? '15px 2px 0 0' : '2px 15px 0 0',
        visorCSSLeft = direction === 'left' ? '0' : '3.6px',
        visorCSSBorderRadius = direction === 'left' ? '10px 2px 0 0' : '2px 10px 0 0',
        gunCSS = direction === 'left' ? '-9px' : '20px';

    player.direction = direction;
    player.gun.style.left = gunCSS;
    player.visor.style.left = visorCSSLeft;
    player.html.style.borderRadius = playerCSS;
    player.visor.style.borderRadius = visorCSSBorderRadius;

    return player.speed;
}


//player crouch function.
function crouch(up, key) {
    const player = key === 's' ? playerOne : playerTwo, playerStyle = player.html.style;
    up ? player.firstPress = undefined : player.firstPress = player.firstPress === undefined;
    up ? player.speed = player.speed * 3 / 2 : player.firstPress ? player.speed = player.speed * 2 / 3 : null;

    playerStyle.top = up ? player.html.offsetTop - 30 + 'px' : player.firstPress ? player.html.offsetTop + 30 + 'px' : playerStyle.top;

    playerStyle.height = up ? '60px' : '30px';
}


//Jumping function
function characterJump(key) {

    const player = key === 'w' ? playerOne : playerTwo;

    if (player.airborne) {
        return;
    }

    player.airborne = true;
    player.html.style.top = player.html.style.top || player.startingTopCSS + 'px';

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