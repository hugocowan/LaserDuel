// I could make these functions methods on the Player constructer function.



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

//Player direction

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