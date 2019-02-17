// import Arena from './constructors/Arena';
// import Ball from './constructors/Ball';
// import Player from './constructors/Player';
// import Platform from './constructors/Platform';

$(function setup() {

    arena = new Arena('arena-1');
    ball = new Ball();
    playerOne = new Player('Player 1');
    playerTwo = new Player('Player 2');
    keypress = {};
    platforms = [
        new Platform('370px', '10%'),
        new Platform('370px', '42%'),
        new Platform('370px', '74.4%'),
        new Platform('260px', '0'),
        new Platform('260px', '84.4%'),
        new Platform('150px', '5%', '209px'),
        new Platform('150px', '62.4%', '209px')
    ];


    //Keydown events

    window.addEventListener('keydown', function (event) {
        event.preventDefault();

        const key = event.key.length > 1 ? event.key : event.key.toLowerCase();
        keypress[key] = true;

        switch(key) {

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


            //player crouching.
            case 's':

                crouchDown(playerOne);
                break;

            case 'ArrowDown':

                crouchDown(playerTwo);
                break;


            //player jumping.
            case 'ArrowUp':
                !playerTwo.airborne ? characterJump(playerTwo) : null;
                break;

            case 'w':
                !playerOne.airborne ? characterJump(playerOne) : null;
                break;
        }
    });

    window.addEventListener('keyup', function (event) {

        const key = event.key.length > 1 ? event.key : event.key.toLowerCase();
        keypress[key] = false;

        if (key === 's') {
            crouchUp(playerOne);
        }

        if (key === 'ArrowDown') {
            crouchUp(playerTwo);
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
