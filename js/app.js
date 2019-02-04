$(function setup() {


    //Global variables.

    // const $ball = $('.ball');
    // const ballTop = $ball.offset().top;
    // const ballLeft = $ball.offset().left;
    // const ballRight = $ball.offset().left+$ball.width();
    // const ballBottom = $ball.offset().top+$ball.height();
    const $player1Health = $('.player1.health');
    const $player1Lives = $('.player1.lives');
    const $player2Health = $('.player2.health');
    const $player2Lives = $('.player2.lives');
    const $arena = $('main');
    const $player1 = $('.player.one');
    const $player2 = $('.player.two');
    const $player1Visor = $('.visor.one');
    const $player2Visor = $('.visor.two');
    const $player1Gun = $('.gun.one');
    const $player2Gun = $('.gun.two');
    const playableWidth = $arena.width() - $player1.width(); //=612
    const playableHeight = $arena.height() - $player1.height(); //=400
    const keypress = {};
    const platforms = $('.platform');
    const keyArray = ['a', 'd', 'w', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'Tab', 'e', 'Backspace', 'Shift'];

    const player1Properties = {
        name: 'Player1',
        airborne: false,
        noLasers: true,
        direction: 'right',
        health: 3,
        lives: 3,
        laserSpeed: 500,
        playerSpeed: 2
    };
    const player2Properties = {
        name: 'Player2',
        airborne: false,
        noLasers: true,
        direction: 'left',
        health: 3,
        lives: 3,
        laserSpeed: 500,
        playerSpeed: 2,
        ducking: false
    };


    // Play the pew pew and pain sound effects
    // Disabled to avoid annoying sounds during dev
    function playSoundEffect(name, ext) {
        // const audioTag = document.createElement('audio');
        // audioTag.setAttribute('src', `./audio/${name}.${ext}`);
        // audioTag.play();
        // audioTag.remove();
    }


    //Movement collision function.

    function collisionPlayer(player, playerProperties, opponentProperties) {

        const playerTop = player.offset().top,
            playerLeft = player.offset().left,
            playerRight = player.offset().left + player.width(),
            playerBottom = playerTop + player.height(),
            platformsTop = [],
            platformsLeft = [];

        $.each(platforms, function () {

            // Use $(this) to get the jQuery object instead of the html document. This gets calculated every time in case the window gets resized.
            platformsTop.push($(this).offset().top);
            platformsLeft.push($(this).offset().left);
        });

        for (let i = 0; i < platforms.length; i++) {

            if (playerLeft < platformsLeft[i] + platforms.width() &&
                playerRight > platformsLeft[i] &&
                playerTop < platformsTop[i] + platforms.height() &&
                playerBottom === platformsTop[i]) {

                playerProperties.airborne = false;

                break;
            }

            // makes airborne false if player is at ground level (560px).
            playerProperties.airborne = playerBottom !== 560;
        }
        // if(playerLeft < ballRight && playerRight > ballLeft &&
        //   playerTop < ballBottom && playerBottom > ballTop){
        //
        //   console.log('It Happened!!');
        //   $ball.remove();
        //   opponent.playerSpeed = 1;
        // }
    }


    // Change player1/2's CSS based on their direction.

    function playerDirection(keyCode1, keyCode2, object) {

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

        return object.playerSpeed;
    }

    // Moves player left/right
    function newPositionX(oldPosition, keyCode1, keyCode2, object) {

        const newPositionX = parseFloat(oldPosition) -
            (keypress[keyCode1] ? playerDirection(keyCode1, keyCode2, object) : 0) +
            (keypress[keyCode2] ? playerDirection(keyCode1, keyCode2, object) : 0);

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
        const newPositionY = parseFloat(oldPosition) + (object.airborne ? object.playerSpeed * 1.25 : 0);

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

        collisionPlayer($player1, player1Properties, player2Properties);
        collisionPlayer($player2, player2Properties, player1Properties);

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

                playSoundEffect('laser', 'mp3');
                pewPew($player1, $player2, playerOffset(player1Properties), player1Properties.direction, player1Properties, player2Properties, player1Properties.laserSpeed);
                break;

            //player2 shooting.
            case 'Backspace'://     8=backspace
            case 'Shift'://         16=shift

                playSoundEffect('laser', 'mp3');
                pewPew($player2, $player1, playerOffset(player2Properties), player2Properties.direction, player2Properties, player1Properties, player2Properties.laserSpeed);
                break;

            //player2 crouching.
            case 'ArrowDown'://     40=down

                player2Properties.ducking = true;
                player2Properties.playerSpeed = 1;
                $player2.css({
                    height: '-=30px'
                    // top: '+=30px'
                });
                break;

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
        if (event.key === '40') {
            player2Properties.ducking = false;
            player2Properties.playerSpeed = 2;
            $player2.css({
                height: '60px',
                top: '-=30px'
            });
        }
    });


    //Laser function

    function playerOffset(object) {
        if (object.direction === 'right') {
            return 30;
        } else {
            return -42;
        }
    }


    function pewPew($shooter, $opponent, offset, playerDirection, object, opponentObject, timer) {
        // console.log($shooter.parent().offset().left);
        const playerGunLeft = $shooter.offset().left - $shooter.parent().offset().left + offset;
        const playerGunTop = $shooter.offset().top - $shooter.parent().offset().top + 20;
        const $laser = $('<div class="laser">');
        const laserPathLeft = playerGunLeft - 612;
        const laserPathRight = playerGunLeft + 612;
        console.log('playerGunLeft', playerGunLeft, 'laser left:', laserPathLeft, 'laser right:', laserPathRight);
        if (playerDirection === 'right') { //limit lasers
            object.noLasers = false; //limit lasers
            // console.log('start of function, noLasers is', object.noLasers);
            $laser.css({
                left: playerGunLeft,
                top: playerGunTop
            });
            $laser.appendTo($('main')).animate({
                left: [laserPathRight, 'linear']
            }, {
                complete: function () {
                    $laser.stop().remove();
                }
            });
        } else {
            object.noLasers = false; //limit lasers
            $laser.css({
                left: playerGunLeft,
                top: playerGunTop
            });
            $laser.appendTo($('main')).animate({
                left: [laserPathLeft, 'linear']
            }, {
                complete: function () {
                    $laser.stop().remove();
                }
            });
        }


        var laserInterval = setInterval(pewPewCollisions, 1);

        function pewPewCollisions() {
            // console.log('pewPew collisions running');

            const opponentLeft = $opponent.offset().left;
            const opponentTop = $opponent.offset().top;
            const opponentRight = opponentLeft + $opponent.width();
            const opponentBottom = opponentTop + $opponent.height();

            const laserTop = $laser.offset().top;
            const laserBottom = $laser.offset().top + $laser.height();
            const laserLeft = $laser.offset().left;
            const laserRight = $laser.offset().left + $laser.width();

            if ((laserRight > opponentLeft && laserRight < opponentRight &&
                laserTop > opponentTop && laserBottom < opponentBottom) ||
                (laserLeft > opponentRight && laserLeft < opponentLeft &&
                    laserTop > opponentTop && laserBottom < opponentBottom)) {
                console.log('BOOM');
                playSoundEffect('hurt', 'wav');
                // $opponent.animate({
                //   'background': 'red'
                // }, 400);
                $laser.stop().remove();
                if (opponentObject.health > 1) {
                    opponentObject.health--;
                    $player1Health.text(player1Properties.health);
                    $player2Health.text(player2Properties.health);
                } else {
                    opponentObject.lives--;
                    opponentObject.health = 3;
                    if ($opponent === $player1 && player1Properties.lives > 0) {
                        $player1Health.text(3);
                    } else if (player2Properties.lives > 0) {
                        $player2Health.text(3);
                    }
                    $player1Lives.text(player1Properties.lives);
                    $player2Lives.text(player2Properties.lives);
                    setTimeout(function () {
                        reset(object);
                    }, 20);
                }
            }
        }

        function pauseLasers(object, timer) {
            setTimeout(function () {
                // console.log('pauseLasers, noLasers is', object.noLasers);
                clearInterval(laserInterval);
                object.noLasers = true; //limit lasers
            }, timer);
        }

        pauseLasers(object, timer);
    }

    function reset(object) {
        console.log('reset running!');

        keyArray.forEach(function (keycode) {
            keypress[keycode] = false;
        });


        if (object.name === 'Player1' && (player2Properties.lives === 0)) {
            $player1Health.text(0);
            alert('Player1 Wins the game!!! WOOOOOO');
            $player1Lives.text(3);
            $player1Health.text(3);
            $player2Lives.text(3);
            $player2Health.text(3);
            player1Properties.lives = 3;
            player1Properties.health = 3;
            player2Properties.lives = 3;
            player2Properties.health = 3;
        } else if (object.name === 'Player2' && (player1Properties.lives === 0)) {
            $player2Health.text(0);
            alert('Player2 Wins the game!!! WOOOOOO');
            $player1Lives.text(3);
            $player1Health.text(3);
            $player2Lives.text(3);
            $player2Health.text(3);
            player1Properties.lives = 3;
            player1Properties.health = 3;
            player2Properties.lives = 3;
            player2Properties.health = 3;
        } else {
            alert(object.name + ' wins the round!');
        }

        player1Properties.airborne = false;
        player1Properties.direction = 'right';
        player1Properties.playerSpeed = 2;
        player1Properties.health = 3;
        $player1Health.text(3);

        player2Properties.airborne = false;
        player2Properties.direction = 'left';
        player2Properties.playerSpeed = 2;
        player2Properties.health = 3;
        $player2Health.text(3);

        $player1.remove().css({
            top: '300px',
            left: '15px'
        }).appendTo($('main'));

        $player2.remove().css({
            top: '300px',
            left: '597px'
        }).appendTo($('main'));
    }

});