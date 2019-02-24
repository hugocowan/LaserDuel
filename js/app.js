//Global variables.
let arena, platforms, modal, keydown, keyup, keypress = {}, ball, playerOne, playerTwo;

window.addEventListener('DOMContentLoaded', function setup() {

    arena = new Arena(1);

    //Keydown events
    keydown = function (event) {
        event.preventDefault();

        const key = event.key.length > 1 ? event.key : event.key.toLowerCase();
        keypress[key] = true;

        switch(key) {

            //player shooting.
            case 'Tab':
            case 'e':
            case 'Backspace':
            case 'Shift':

                pewPew(key);
                break;

            //player crouching.
            case 's':
            case 'ArrowDown':

                crouch(false, key);
                break;

            //player jumping.
            case 'ArrowUp':
            case 'w':

                characterJump(key);
                break;
        }
    };

    //Keyup events
    keyup = function (event) {

        const key = event.key.length > 1 ? event.key : event.key.toLowerCase();
        keypress[key] = false;

        if (key === 's' || key === 'ArrowDown') {
            crouch(true, key);
        }
    };

    window.addEventListener('keydown', keydown);
    window.addEventListener('keyup', keyup);


    //Update platform positions on window resize
    window.addEventListener('resize', function() {

        platforms.forEach(function (platform) {
            platform.setRect();
        });

        ball.setRect();
        arena.setRect();
    });


    //Movement and collisions.
    function movementAndCollision() {

        playerCollisions(playerOne, playerTwo);
        playerCollisions(playerTwo, playerOne);

        playerMovementCSS('a', 'd', playerOne);
        playerMovementCSS('ArrowLeft', 'ArrowRight', playerTwo);

        requestAnimationFrame(movementAndCollision);
    }

    requestAnimationFrame(movementAndCollision);
});
