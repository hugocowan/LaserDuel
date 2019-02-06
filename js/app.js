$(function setup() {

    // $ball = $('.ball');
    // ballTop = $ball.offset().top;
    // ballLeft = $ball.offset().left;
    // ballRight = $ball.offset().left+$ball.width();
    // ballBottom = $ball.offset().top+$ball.height();

    $arena = $('main');
    keypress = {};
    platforms = $('.platform');
    keyArray = ['a', 'd', 'w', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'Tab', 'e', 'Backspace', 'Shift'];
    playerOne = new Player('Player1', false, true, 'right', 3, 3, 500, 2);
    playerTwo = new Player('Player2', false, true, 'left', 3, 3, 500, 2);
    playableWidth = $arena.width() - playerOne.$body.width(); //=612
    playableHeight = $arena.height() - playerOne.$body.height(); //=400


    //Keydown events

    window.addEventListener('keydown', function (event) {
        event.preventDefault();
        keypress[event.key] = true;

        switch(event.key) {

            //player 1 shooting. noLasers gives the delay between shots.
            case 'Tab'://           9=tab
            case 'e'://             69=e
                if (playerOne.noLasers) {

                    playSoundEffect('laser', 'mp3');
                    pewPew(playerOne, playerTwo);

                }
                break;

            //player2 shooting.
            case 'Backspace'://     8=backspace
            case 'Shift'://         16=shift

                if (playerTwo.noLasers) {

                    playSoundEffect('laser', 'mp3');
                    pewPew(playerTwo, playerOne);

                }
                break;

            //player2 crouching.
            // case 'ArrowDown'://     40=down
            //
            //     playerTwo.ducking = true;
            //     playerTwo.speed = 1;
            //     $player2.css({
            //         height: '-=30px',
            //         top: '+=30px'
            //     });
            //     break;

            case 'ArrowUp':
                !playerTwo.airborne ? characterJump(playerTwo) : null;
                break;

            case 'w':
                !playerOne.airborne ? characterJump(playerOne) : null;
                break;
        }
    });

    window.addEventListener('keyup', function (event) {
        keypress[event.key] = false;

        // if (event.key === 'ArrowDown') {
        //     playerTwo.ducking = false;
        //     playerTwo.speed = 2;
        //     $player2.css({
        //         height: '60px',
        //         top: '-=30px'
        //     });
        // }
    });


    //Movement Interval.

    setInterval(function () {

        playerCollisions(playerOne, playerTwo);
        playerCollisions(playerTwo, playerOne);

        playerMovementCSS('a', 'd', playerOne);
        playerMovementCSS('ArrowLeft', 'ArrowRight', playerTwo);

    }, 15);

});