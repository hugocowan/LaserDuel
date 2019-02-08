$(function setup() {

    arena = document.getElementsByTagName('main')[0];
    ball = new Ball();
    keypress = {};
    platform1 = new Platform('77%', '10%');
    platform2 = new Platform('77%', '42%');
    platform3 = new Platform('77%', '74.4%');
    platform4 = new Platform('54.2%', '0');
    platform5 = new Platform('54.2%', '84.4%');
    platform6 = new Platform('31.2%', '5%');
    platform7 = new Platform('31.2%', '79.4%');
    platform8 = new Platform('31.2%', '20%');
    platform9 = new Platform('31.2%', '70%');
    platform10 = new Platform('31.2%', '22%');
    platform11 = new Platform('31.2%', '62.4%');
    platforms = document.getElementsByClassName('platform');
    playerOne = new Player('Player 1', 'right');
    playerTwo = new Player('Player 2', 'left');
    playableWidth = arena.clientWidth - playerOne.body.clientWidth; //=612

    //Keydown events

    console.log(platforms);

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
