// I could make these functions methods on the Player constructer function.



//Player movement

function playerMovementCSS($player, keyCode1, keyCode2, playerProperties) {

    $player.css({
        left: function (index, oldPosition) {
            return newPositionX(oldPosition, keyCode1, keyCode2, playerProperties);
        },
        top: function (index, oldPosition) {
            return newPositionY(oldPosition, playerProperties);
        }
    });
}

//Player direction

function playerDirectionCSS(direction, playerProperties, $player, $visor, $gun) {

    let playerCSS = { borderRadius: '15px 2px 0 0' },
        visorCSS = { left: '0px', borderRadius: '10px 2px 0 0' },
        gunCSS = { left: '-9px' };

    if (direction === 'right') {
        playerCSS = { borderRadius: '2px 15px 0 0' };
        visorCSS = { left: '3.6px', borderRadius: '2px 10px 0 0' };
        gunCSS = { left: '20px' };
    }

    playerProperties.direction = direction;
    $player.css(playerCSS);
    $visor.css(visorCSS);
    $gun.css(gunCSS);
}


//Jumping function

function characterJump(player, playerProperties) {

    playerProperties.airborne = true;
    player.animate({
        'top': '-=110px'
    });
}