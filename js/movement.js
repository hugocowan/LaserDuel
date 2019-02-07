//Player movement

// I can't use CSS transformations or animations because of inline styling.
// If I moved all CSS manipulation to a stylesheet, then I'd be able to use them.

function playerMovementCSS(keyCode1, keyCode2, player) {

    player.body.style.left = newPositionX(keyCode1, keyCode2, player) + 'px';
    player.body.style.top = newPositionY(player) + 'px';

}


// Moves player left/right
function newPositionX(keyCode1, keyCode2, player) {

    !player.body.style.left ? player.body.style.left = player.startingLeftCSS + 'px' : null;

    const newPositionX = parseFloat(player.body.style.left) -
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
function newPositionY(player) {

    !player.body.style.top ? player.body.style.top = player.startingTopCSS + 'px' : null;

    const newPositionY = parseFloat(player.body.style.top) + (player.airborne ? 1 : 0);

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

    let playerCSS = direction === 'left' ? '15px 2px 0 0' : '2px 15px 0 0',
        visorCSSLeft = direction === 'left' ? '0' : '3.6px',
        visorCSSBorderRadius = direction === 'left' ? '10px 2px 0 0' : '2px 10px 0 0',
        gunCSS = direction === 'left' ? '-9px' : '20px';

    player.direction = direction;
    player.gun.style.left = gunCSS;
    player.visor.style.left = visorCSSLeft;
    player.body.style.borderRadius = playerCSS;
    player.visor.style.borderRadius = visorCSSBorderRadius;
}


//Jumping function
function characterJump(player) {

    !player.body.style.top ? player.body.style.top = player.startingTopCSS + 'px' : null;

    player.airborne = true;

    player.$body.animate({
        'top': `-=${player.jumpHeight}px`
    });




    // let originalTop = player.body.style.top,
    //     top = 0;
    //
    // function frame() {
    //
    //     // top < 55 ? top += 2 : top += 1;
    //
    //     top++;
    //
    //     let newTop = parseFloat(originalTop) - top;
    //
    //     player.body.style.top = newTop + 'px'; // show frame
    //
    //     if (top >= player.jumpHeight) { // check finish condition
    //
    //         clearInterval(id);
    //     }
    // }
    //
    // let id = setInterval(frame, 0) // draw asap.


    // let jumpHeight = parseFloat(player.body.style.top) - player.jumpHeight + 'px';
    //
    // player.body.animate([
    //     { top: player.body.style.top },
    //     { top: jumpHeight },
    // ], {
    //     duration: 500,
    //     easing: 'linear',
    //     // fill: 'forwards',
    // });
    //
    // setTimeout(function() {
    //     player.body.style.top = jumpHeight;
    // }, 500);
}
