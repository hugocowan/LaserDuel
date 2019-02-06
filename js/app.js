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
    playerOne = new Player('Player 1', false, true, 'right', 3, 3, 500, 0.75);
    playerTwo = new Player('Player 2', false, true, 'left', 3, 3, 500, 0.75);
    playableWidth = $arena.width() - playerOne.$body.width(); //=612


    //Keydown events

    window.addEventListener('keydown', function (event) {
        event.preventDefault();
        keypress[event.key] = true;

        switch(event.key) {

            //player 1 shooting. noLasers gives the delay between shots.
            case 'Tab':
            case 'e':
                if (playerOne.noLasers) {

                    playSoundEffect('laser', 'mp3');
                    pewPew(playerOne, playerTwo);

                }
                break;

            //player2 shooting.
            case 'Backspace':
            case 'Shift':

                if (playerTwo.noLasers) {

                    playSoundEffect('laser', 'mp3');
                    pewPew(playerTwo, playerOne);

                }
                break;

            //player1 crouching.
            case 's':

                playerOne.firstPress === undefined ? playerOne.firstPress = true : playerOne.firstPress = false;
                // playerOne.speed = 1;
                playerOne.$body.css({
                    height: '30px',
                    top: playerOne.firstPress ? '+=30px' : playerOne.body.offsetTop
                });
                break;

            //player2 crouching.
            case 'ArrowDown':

                playerTwo.firstPress === undefined ? playerTwo.firstPress = true : playerTwo.firstPress = false;
                // playerTwo.speed = 1;
                playerTwo.$body.css({
                    height: '30px',
                    top: playerTwo.firstPress ? '+=30px' : playerTwo.body.offsetTop
                });
                break;

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

        if (event.key === 's') {
            playerOne.firstPress = undefined;
            // playerOne.speed = 2;
            playerOne.$body.css({
                height: '60px',
                top: '-=30px'
            });
        }

        if (event.key === 'ArrowDown') {
            playerTwo.firstPress = undefined;
            // playerTwo.speed = 2;
            playerTwo.$body.css({
                height: '60px',
                top: '-=30px'
            });
        }
    });


    //Movement Interval.

    setInterval(function () {

        playerCollisions(playerOne, playerTwo);
        playerCollisions(playerTwo, playerOne);

        playerMovementCSS('a', 'd', playerOne);
        playerMovementCSS('ArrowLeft', 'ArrowRight', playerTwo);

    }, 6.5);

});