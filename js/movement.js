// Change player1/2's CSS based on their direction.

function playerDirection(keyCode1, keyCode2, playerProperties) {

    function css(direction, playerProperties, $player, $visor, $gun) {

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

    if (keypress[keyCode1] && keyCode1 === 'a') {
        css('left', player1Properties, $player1, $player1Visor, $player1Gun);
    } else if (keypress[keyCode2] && keyCode2 === 'd') {
        css('right', player1Properties, $player1, $player1Visor, $player1Gun);
    } else if (keypress[keyCode1] && keyCode1 === 'ArrowLeft') {
        css('left', player2Properties, $player2, $player2Visor, $player2Gun);
    } else if (keypress[keyCode2] && keyCode2 === 'ArrowRight') {
        css('right', player2Properties, $player2, $player2Visor, $player2Gun);
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
function newPositionY(oldPosition, keyCode, player, object) {

    const newPositionY = parseFloat(oldPosition) + (object.airborne ? object.speed * 1.25 : 0);

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

    if (player1 !== undefined) {
        playerCollisions(player1, player1Properties, player2Properties);
        playerCollisions(player2, player2Properties, player1Properties);
    }


    $player1.css({
        left: function (index, oldPosition) {
            return newPositionX(oldPosition, 'a', 'd', player2Properties); //a=a, d=d
        },
        top: function (index, oldPosition) {
            return newPositionY(oldPosition, 'w', $player1, player1Properties); //w=w, 83=s
        }
    });
    $player2.css({
        left: function (index, oldPosition) {
            return newPositionX(oldPosition, 'ArrowLeft', 'ArrowRight', player1Properties); //ArrowLeft=left, ArrowRight=right
        },
        top: function (index, oldPosition) {
            return newPositionY(oldPosition, 'ArrowUp', $player2, player2Properties, false); //ArrowUp=up, 40=down
        }
    });
}, 15);



//Jumping function.

function characterJump(player, playerProperties) {

    playerProperties.airborne = true;
    player.animate({
        'top': '-=110px'
    });
}