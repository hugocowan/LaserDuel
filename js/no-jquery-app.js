window.addEventListener('DOMContentLoaded', function () {


    //Global variables.
    // const $ball = $('.ball');
    // const ballTop = $ball.offset().top;
    // const ballLeft = $ball.offset().left;
    // const ballRight = $ball.offset().left+$ball.width();
    // const ballBottom = $ball.offset().top+$ball.height();
    const player1Health = document.getElementsByClassName('player1 health')[0];
    const player1Lives = document.getElementsByClassName('player1 lives')[0];
    const player2Health = document.getElementsByClassName('player2 health')[0];
    const player2Lives = document.getElementsByClassName('player2 lives')[0];
    const arena = document.getElementsByTagName('main')[0];
    const player1 = document.getElementsByClassName('player one')[0];
    const player2 = document.getElementsByClassName('player two')[0];
    const player1Visor = document.getElementsByClassName('visor one')[0];
    const player2Visor = document.getElementsByClassName('visor two')[0];
    const player1Gun = document.getElementsByClassName('gun one')[0];
    const player2Gun = document.getElementsByClassName('gun two')[0];
    const playableWidth = arena.width() - player1.width(); //=612
    const playableHeight = arena.height() - player1.height(); //=400
    const keypress = {};
    const platforms = document.getElementsByClassName('.platform');
    let arrayTop = [];
    let arrayLeft = [];
    const keyArray = [65, 68, 87, 37, 39, 38, 9, 69, 8, 16];
    const player1Object = {
        name: 'Player1',
        gravity: true,
        airborne: false,
        jumping: false,
        noLasers: true,
        direction: 'right',
        health: 3,
        lives: 3,
        laserSpeed: 500,
        speed: 2
    };
    const player2Object = {
        name: 'Player2',
        gravity: true,
        airborne: false,
        jumping: false,
        noLasers: true,
        direction: 'left',
        health: 3,
        lives: 3,
        laserSpeed: 500,
        speed: 2,
        ducking: false
    };


    function playSoundEffect(name, ext) {
        const audioTag = document.createElement('audio');
        audioTag.setAttribute('src', `./audio/${name}.${ext}`);
        audioTag.play();
        audioTag.remove();
    }

    // X/Y movement functions.

    function direction(keyCode1, keyCode2, object) {
        if (keypress[keyCode1] && keyCode1 === 65) {
            player1Object.playerDirection = 'left';
            player1.setAttribute('style', "borderRadius: '15px 2px 0 0';");
            player1Visor.setAttribute('style', "left: '0px'; borderRadius: '10px 2px 0 0';");
            player1Gun.setAttribute('style', "left: '-9px';");
            return object.speed;
        } else if (keypress[keyCode2] && keyCode2 === 68) {
            player1Object.playerDirection = 'right';
            player1.setAttribute('style', "borderRadius: '2px 15px 0 0';");
            player1Visor.setAttribute('style', "left: '3.6px'; borderRadius: '2px 10px 0 0';");
            player1Gun.setAttribute('style', "left: '20px';");
            return object.speed;
        } else if (keypress[keyCode1] && keyCode1 === 37) {
            player2Object.playerDirection = 'left';
            player2.setAttribute('style', "borderRadius: '15px 2px 0 0';");
            player2Visor.setAttribute('style', "left: '0px'; borderRadius: '10px 2px 0 0';");
            player2Gun.setAttribute('style', "left: '-9px';");
            return object.speed;
        } else if (keypress[keyCode2] && keyCode2 === 39) {
            player2Object.playerDirection = 'right';
            player2.setAttribute('style', "borderRadius: '2px 15px 0 0';");
            player2Visor.setAttribute('style', "left: '3.6px'; borderRadius: '2px 10px 0 0';");
            player2Gun.setAttribute('style', "left: '20px';");
            return object.speed;
        }
        return object.speed;
    }

    function newPositionX(oldPosition, keyCode1, keyCode2, object) {

        const newPositionX = parseFloat(oldPosition) - (keypress[keyCode1] ? direction(keyCode1, keyCode2, object) : 0) + (keypress[keyCode2] ? direction(keyCode1, keyCode2, object) : 0);

        if (newPositionX < 0) {
            return 0;
        } else if (newPositionX >= playableWidth) {
            return playableWidth;
        } else {
            return newPositionX;
        }
    }

    function newPositionY(oldPosition, keyCode, player, object) {
        const newPositionY = parseFloat(oldPosition) - ((keypress[keyCode] && !object.airborne && !object.jumping) ? characterJump(player, object) : 0) + (object.gravity ? object.speed * 1.25 : 0);

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


    //Jumping function.

    function characterJump(player, object) {
        if (!object.jumping) {
            object.jumping = true;
            let top = 0;

            function frame() {
                top--;  // update parameters
                player.style.top = top + 'px'; // show frame
                if (top === -110) { // check finish condition
                    clearInterval(id)
                }
            }

            const id = setInterval(frame, 20); // draw every 10ms
        }

        function stopDoubleJump() {
            setTimeout(function () {
                object.jumping = false;
            }, 400);
        }

        stopDoubleJump();
    }



    //Movement collision function.

    function collisionPlayer(player, object, opponent) {
        const playerTop = player.offset().top;
        const playerLeft = player.offset().left;
        const playerRight = player.offset().left + player.width();
        const playerBottom = playerTop + player.height();
        $.each(platforms, function (i, platform) {
            platform = $(this);
            if (arrayTop.length > 10 || arrayLeft.length > 10) {
                arrayTop = [];
                arrayLeft = [];
            }
            arrayTop.push(platform.offset().top);
            arrayLeft.push(platform.offset().left);
            // console.log(arrayTop, arrayLeft);
        });
        // console.log('player1:',opponent.speed, 'player2:',object.speed);

        for (var i = 0; i < platforms.length; i++) {

            if (playerLeft < arrayLeft[i] + platforms.width() &&
                playerRight > arrayLeft[i] &&
                playerTop < arrayTop[i] + platforms.height() &&
                playerBottom === arrayTop[i]) {
                // console.log('player on platform, gravity', object.gravity,'airborne', object.airborne);
                object.gravity = false;
                object.airborne = false;
                break;
            } else {
                // console.log('player bottom', playerBottom);
                object.gravity = true;
            }
            if (playerBottom === 560) {
                object.airborne = false;
            } else {
                object.airborne = true;
            }
        }
        // if(playerLeft < ballRight && playerRight > ballLeft &&
        //   playerTop < ballBottom && playerBottom > ballTop){
        //
        //   console.log('It Happened!!');
        //   $ball.remove();
        //   opponent.speed = 1;
        // }
    }


    //Intervals.

    setInterval(function () {

        collisionPlayer($player1, player1Object, player2Object);
        collisionPlayer($player2, player2Object, player1Object);

        $player1.css({
            left: function (index, oldPosition) {
                // console.log(index, oldPosition);
                return newPositionX(oldPosition, 65, 68, player2Object); //65=a, 68=d.
            },
            top: function (index, oldPosition) {
                // console.log(index, oldPosition);
                return newPositionY(oldPosition, 87, $player1, player1Object); //38 up, 40 down.
            }
        });
        $player2.css({
            left: function (index, oldPosition) {
                return newPositionX(oldPosition, 37, 39, player1Object); //37=left, 39=right.
            },
            top: function (index, oldPosition) {
                return newPositionY(oldPosition, 38, $player2, player2Object);
            }
        });
    }, 15);

    //Keydown events

    // for ducking.

    $(window).keydown(function (event) {
        event.preventDefault();
        keypress[event.which] = true;
        if ((event.which === 9 || event.which === 69) && player1Object.noLasers) {
            console.log('Pew!');
            playSoundEffect('laser', 'mp3');
            return pewPew(player1, player2, playerOffset(player1Object), player1Object.direction, player1Object, player2Object, player1Object.laserSpeed);
        } else if ((event.which === 8 || event.which === 16) && player2Object.noLasers) {
            playSoundEffect('laser', 'mp3');
            return pewPew(player2, player1, playerOffset(player2Object), player2Object.direction, player2Object, player1Object, player2Object.laserSpeed);
        } else if (event.which === 40) {
            player2Object.ducking = true;
            player2Object.jumping = true;
            player2Object.playerSpeed = 1;
            console.log('crouching');
            player2.setAttribute('style', "height: '-=30px'// top: '+=30px'");
        }
    });

    $(window).keyup(function (event) {
        keypress[event.which] = false;
        if (event.which === 40) {
            player2Object.ducking = false;
            player2Object.jumping = false;
            player2Object.playerSpeed = 2;
            player2.setAttribute('style', "height: '60px',top: '-=30px'");
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
            $laser.setAttribute('style', "left: playerGunLeft,top: playerGunTop");
            $laser.appendTo($('main')).animate({
                left: [laserPathRight, 'linear']
            }, {
                complete: function () {
                    $laser.stop().remove();
                }
            });
        } else {
            object.noLasers = false; //limit lasers
            $laser.setAttribute('style', "left: playerGunLeft,top: playerGunTop");
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
                    player1Health.text(player1Object.health);
                    player2Health.text(player2Object.health);
                } else {
                    opponentObject.lives--;
                    opponentObject.health = 3;
                    if ($opponent === player1 && player1Object.lives > 0) {
                        player1Health.text(3);
                    } else if (player2Object.lives > 0) {
                        player2Health.text(3);
                    }
                    player1Lives.text(player1Object.lives);
                    player2Lives.text(player2Object.lives);
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


        if (object.name === 'Player1' && (player2Object.lives === 0)) {
            player1Health.text(0);
            alert('Player1 Wins the game!!! WOOOOOO');
            player1Lives.text(3);
            player1Health.text(3);
            player2Lives.text(3);
            player2Health.text(3);
            player1Object.lives = 3;
            player1Object.health = 3;
            player2Object.lives = 3;
            player2Object.health = 3;
        } else if (object.name === 'Player2' && (player1Object.lives === 0)) {
            player2Health.text(0);
            alert('Player2 Wins the game!!! WOOOOOO');
            player1Lives.text(3);
            player1Health.text(3);
            player2Lives.text(3);
            player2Health.text(3);
            player1Object.lives = 3;
            player1Object.health = 3;
            player2Object.lives = 3;
            player2Object.health = 3;
        } else {
            alert(object.name + ' wins the round!');
        }

        player1Object.gravity = true;
        player1Object.airborne = false;
        player1Object.jumping = false;
        player1Object.playerDirection = 'right';
        player1Object.playerSpeed = 2;
        player1Object.health = 3;
        player1Health.text(3);

        player2Object.gravity = true;
        player2Object.airborne = false;
        player2Object.jumping = false;
        player2Object.playerDirection = 'left';
        player2Object.playerSpeed = 2;
        player2Object.health = 3;
        player2Health.text(3);

        player1.remove().setAttribute('style', "top: '300px',left: '15px'").appendTo($('main'));

        player2.remove().setAttribute('style', "top: '300px',left: '597px'").appendTo($('main'));
    }

});