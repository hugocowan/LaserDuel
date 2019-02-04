$(function setup() {


    //Global variables.

    // const $ball = $('.ball');
    // const ballTop = $ball.offset().top;
    // const ballLeft = $ball.offset().left;
    // const ballRight = $ball.offset().left+$ball.width();
    // const ballBottom = $ball.offset().top+$ball.height();
    const $player1Health = $('.player1.health'),
        $player1Lives = $('.player1.lives'),
        $player2Health = $('.player2.health'),
        $player2Lives = $('.player2.lives'),
        $arena = $('main'),
        $player1 = $('.player.one'),
        $player2 = $('.player.two'),
        player1 = document.getElementsByClassName('player one')[0],
        player2 = document.getElementsByClassName('player two')[0],
        $player1Visor = $('.visor.one'),
        $player2Visor = $('.visor.two'),
        $player1Gun = $('.gun.one'),
        $player2Gun = $('.gun.two'),
        playableWidth = $arena.width() - $player1.width(), //=612
        playableHeight = $arena.height() - $player1.height(), //=400
        keypress = {},
        platforms = $('.platform'),
        keyArray = ['a', 'd', 'w', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'Tab', 'e', 'Backspace', 'Shift'],

        player1Properties = {
            name: 'Player1',
            airborne: false,
            noLasers: true,
            direction: 'right',
            health: 3,
            lives: 3,
            laserSpeed: 500,
            speed: 2
        },

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

    let laserInterval;


    // Play the pew pew and pain sound effects
    // Disabled to avoid annoying sounds during dev
    function playSoundEffect(name, ext) {
        const audioTag = document.createElement('audio');
        audioTag.setAttribute('src', `./audio/${name}.${ext}`);
        audioTag.play();
        audioTag.remove();
    }


    //Movement collision function.

    function playerCollisions(player, playerProperties, opponentProperties) {

        const playerRect = player.getBoundingClientRect();

        for (let i = 0; i < platforms.length; i++) {

            const platformRect = platforms[i].getBoundingClientRect();

            if (playerRect.left < platformRect.right &&
                playerRect.right > platformRect.left &&
                playerRect.top < platformRect.bottom &&
                playerRect.bottom === platformRect.top) {

                playerProperties.airborne = false;

                break;
            }

            // makes airborne false if player is at ground level (560px).
            playerProperties.airborne = playerRect.bottom !== 560;
        }
        // if(playerRect.left < ballRect.right && playerRect.right > ballRect.left &&
        //   playerRect.top < ballRect.bottom && playerRect.bottom > ballRect.top){
        //
        //   console.log('It Happened!!');
        //   $ball.remove();
        //   opponent.speed = 1;
        // }
    }

    //Laser collisions
    function pewPewCollisions($laser, opponent, playerProperties, opponentProperties) {

        const laserTop = $laser.offset().top, laserBottom = $laser.offset().top + $laser.height(),
            laserLeft = $laser.offset().left, laserRight = $laser.offset().left + $laser.width(),
            opponentRect = opponent.getBoundingClientRect();

        if ((laserRight > opponentRect.left && laserRight < opponentRect.right &&
            laserTop > opponentRect.top && laserBottom < opponentRect.bottom) ||
            (laserLeft > opponentRect.right && laserLeft < opponentRect.left &&
                laserTop > opponentRect.top && laserBottom < opponentRect.bottom)) {

            playSoundEffect('hurt', 'wav');

            // $opponent.animate({
            //   'background': 'red'
            // }, 400);

            $laser.stop().remove();

            if (opponentProperties.health > 1) {

                opponentProperties.health--;
                $player1Health.text(player1Properties.health);
                $player2Health.text(player2Properties.health);

            } else {

                opponentProperties.lives--;
                opponentProperties.health = 3;

                if (opponent === $player1 && player1Properties.lives > 0) {

                    $player1Health.text(3);

                } else if (player2Properties.lives > 0) {

                    $player2Health.text(3);

                }

                $player1Lives.text(player1Properties.lives);
                $player2Lives.text(player2Properties.lives);

                setTimeout(function () {
                    reset(playerProperties);
                }, 20);
            }

        }
    }


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

        playerCollisions(player1, player1Properties, player2Properties);
        playerCollisions(player2, player2Properties, player1Properties);

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

    function characterJump(player, object) {

        object.airborne = true;
        player.animate({
            'top': '-=110px'
        });
    }


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


    //Laser function

    function pewPew(shooter, opponent, playerDirection, playerProperties, opponentProperties, timer) {
        
        const shooterRect = shooter.getBoundingClientRect(),
            arenaRect = shooter.parentNode.getBoundingClientRect(),
            playerGunLeft = shooterRect.left - arenaRect.left + (playerProperties.direction === 'right' ? 30 : -42),
            playerGunTop = shooterRect.top - arenaRect.top + 20,
            $laser = $('<div class="laser">'),
            laserPathLeft = playerGunLeft - 612,
            laserPathRight = playerGunLeft + 612;

        playerProperties.noLasers = false; //limit lasers

        $laser.css({
            left: playerGunLeft,
            top: playerGunTop
        });

        $laser.appendTo($('main')).animate({
            left: [playerDirection === 'right' ? laserPathRight: laserPathLeft, 'linear']
        }, {
            complete: function () {
                $laser.stop().remove();
            }
        });

        //Interval to run laser collisions every ms
        laserInterval = setInterval(function () {
            pewPewCollisions($laser, opponent, playerProperties, opponentProperties);
        }, 1);

        // Stop laser collision detection after ${timer} ms
        setTimeout(function () {

            clearInterval(laserInterval);
            // To delay next laser shot.
            playerProperties.noLasers = true; //Allow lasers
        }, timer);

    }


    //Reset lives/health/player positions
    function reset(playerProperties) {

        keyArray.forEach(function (keycode) {
            keypress[keycode] = false;
        });

        if (player2Properties.lives === 0 || player1Properties.lives === 0) {

            $player1Health.text(0);
            alert(`${playerProperties.name} Wins the game!!! WOOOOOO`);
            $player1Lives.text(3);
            $player1Health.text(3);
            $player2Lives.text(3);
            $player2Health.text(3);
            player1Properties.lives = 3;
            player1Properties.health = 3;
            player2Properties.lives = 3;
            player2Properties.health = 3;

        } else {

            alert(`${playerProperties.name} wins the round!`);
        }

        player1Properties.airborne = false;
        player1Properties.direction = 'right';
        player1Properties.speed = 2;
        player1Properties.health = 3;
        $player1Health.text(3);

        player2Properties.airborne = false;
        player2Properties.direction = 'left';
        player2Properties.speed = 2;
        player2Properties.health = 3;
        $player2Health.text(3);


        // CSS could be randomised to make the starts a little more interesting...?
        $player1.css({
            top: '300px',
            left: '15px'
        });

        $player2.css({
            top: '300px',
            left: '597px'
        });
    }

});