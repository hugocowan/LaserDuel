$(function setup() {


    //Global variables.

    // const $ball = $('.ball');
    // const ballTop = $ball.offset().top;
    // const ballLeft = $ball.offset().left;
    // const ballRight = $ball.offset().left+$ball.width();
    // const ballBottom = $ball.offset().top+$ball.height();
    $player1Health = $('.player1.health');
    $player1Lives = $('.player1.lives');
    $player2Health = $('.player2.health');
    $player2Lives = $('.player2.lives');
    $arena = $('main');
    $player1 = $('.player.one');
    $player2 = $('.player.two');
    player1 = document.getElementsByClassName('player one')[0];
    player2 = document.getElementsByClassName('player two')[0];
    $player1Visor = $('.visor.one');
    $player2Visor = $('.visor.two');
    $player1Gun = $('.gun.one');
    $player2Gun = $('.gun.two');
    playableWidth = $arena.width() - $player1.width(); //=612
    playableHeight = $arena.height() - $player1.height(); //=400
    keypress = {};
    platforms = $('.platform');
    keyArray = ['a', 'd', 'w', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'Tab', 'e', 'Backspace', 'Shift'];

    player1Properties = {
        name: 'Player1',
        airborne: false,
        noLasers: true,
        direction: 'right',
        health: 3,
        lives: 3,
        laserSpeed: 500,
        speed: 2
    };

    player2Properties = {
        name: 'Player2',
        airborne: false,
        noLasers: true,
        direction: 'left',
        health: 3,
        lives: 3,
        laserSpeed: 500,
        speed: 2,
        ducking: false
    };


    //Keydown events

    window.addEventListener('keydown', function (event) {
        event.preventDefault();
        keypress[event.key] = true;

        switch(event.key) {

            //player 1 shooting. noLasers gives the delay between shots.
            case 'Tab'://           9=tab
            case 'e'://             69=e
                if (player1Properties.noLasers) {

                    playSoundEffect('laser', 'mp3');
                    pewPew(player1, player2, player1Properties.direction, player1Properties, player2Properties, player1Properties.laserSpeed);

                }
                break;

            //player2 shooting.
            case 'Backspace'://     8=backspace
            case 'Shift'://         16=shift

                if (player2Properties.noLasers) {

                    playSoundEffect('laser', 'mp3');
                    pewPew(player2, player1, player2Properties.direction, player2Properties, player1Properties, player2Properties.laserSpeed);

                }
                break;

            //player2 crouching.
            // case 'ArrowDown'://     40=down
            //
            //     player2Properties.ducking = true;
            //     player2Properties.speed = 1;
            //     $player2.css({
            //         height: '-=30px',
            //         top: '+=30px'
            //     });
            //     break;

            case 'ArrowUp':
                !player2Properties.airborne ? characterJump($player2, player2Properties) : null;
                break;

            case 'w':
                !player1Properties.airborne ? characterJump($player1, player1Properties) : null;
                break;
        }
    });

    window.addEventListener('keyup', function (event) {
        keypress[event.key] = false;

        // if (event.key === 'ArrowDown') {
        //     player2Properties.ducking = false;
        //     player2Properties.speed = 2;
        //     $player2.css({
        //         height: '60px',
        //         top: '-=30px'
        //     });
        // }
    });

});