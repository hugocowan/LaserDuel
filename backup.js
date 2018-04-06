//Keydown events.

$(window).keydown(function(event){
  keypress[event.which] = true;
});
$(window).keydown(function(event){
  if(event.which === 69 && player1Object.noLasers){
    player1Object.noLasers = false;
    return pewPew($player1, $player2, playerOffset(player1Object), player1Object.playerDirection, player1Object, player2Object, $player1Health, $player1Lives);
  }else if(event.which === 13 && player2Object.noLasers){
    player2Object.noLasers = false;
    pewPew($player2, $player1, playerOffset(player2Object), player2Object.playerDirection, player2Object, player1Object, $player2Health, $player2Lives);
  }
});
$(window).keyup(function(event){
  keypress[event.which] = false;
});


//Laser functions.

function playerOffset(object){
  if(object.playerDirection === 'right'){
    return 30;
  }else{
    return -42;
  }
}

function pewPew($shooter, $opponent, offset, playerDirection, object, opponentObject, health, lives){
  const playerGunLeft = $shooter.offset().left - $shooter.parent().offset().left + offset;
  const playerGunTop = $shooter.offset().top - $shooter.parent().offset().top + 20;
  const $laser = $('<div class="laser">');
  const laserPathLeft = 606;
  const laserPathRight = -30;

  if(playerDirection==='right'){
    console.log('start of function, noLasers is', object.noLasers);
    $laser.css({
      left: playerGunLeft,
      top: playerGunTop
    });
    $laser.appendTo($('main')).animate({
      left: [laserPathLeft, 'linear']
    },{
      complete: function(){
        $laser.stop().remove();
      }
    });
  }else{
    $laser.css({
      left: playerGunLeft,
      top: playerGunTop
    });
    $laser.appendTo($('main')).animate({
      left: [laserPathRight, 'linear']
    },{
      complete: function(){
        $laser.stop().remove();
      }
    });
  }
  // pauseLasers(object);

  var laserInterval = setInterval(pewPewCollisions, 15);

  function pewPewCollisions(){
    console.log('pewPew collisions running');

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
        laserTop > opponentTop && laserBottom < opponentBottom)){
      // console.log('laserLeft =', laserLeft,' opponentRight =', opponentRight);
      console.log('BOOM');
      $laser.stop().remove();
      pauseLasers(object);
      if(opponentObject.health>1){
        opponentObject.health --;
        switch(player1Object.health){
          case 0:
            // console.log('case 0 is happening');
            $player1Health.text(0);
            break;
          case 1:
            // console.log('case 1 is happening');
            $player1Health.text(1);
            break;
          case 2:
            // console.log('case 2 is happening');
            $player1Health.text(2);
            break;
          case 3:
            // console.log('case 3 is happening');
            $player1Health.text(3);
            break;
        }
        switch(player2Object.health){
          case 0:
            // console.log('case 0 is happening');
            $player2Health.text(0);
            break;
          case 1:
            // console.log('case 1 is happening');
            $player2Health.text(1);
            break;
          case 2:
            // console.log('case 2 is happening');
            $player2Health.text(2);
            break;
          case 3:
            // console.log('case 3 is happening');
            $player2Health.text(3);
            break;
        }
      }else{
        opponentObject.lives --;
        switch(player1Object.lives){
          case 0:
            // console.log('case 0 is happening');
            $player1Lives.text(0);
            $winner.text('Player2');
            break;
          case 1:
            // console.log('case 1 is happening');
            $player1Lives.text(1);
            break;
          case 2:
            // console.log('case 2 is happening');
            $player1Lives.text(2);
            break;
          case 3:
            // console.log('case 3 is happening');
            $player1Lives.text(3);
            break;
          case 4:
            // console.log('case 4 is happening');
            $player1Lives.text(4);
            break;
          case 5:
            // console.log('case 5 is happening');
            $player1Lives.text(5);
            break;
        }
        switch(player2Object.lives){
          case 0:
            // console.log('case 1 is happening');
            $player2Lives.text(0);
            $winner.text('Player1');
            break;
          case 1:
            // console.log('case 1 is happening');
            $player2Lives.text(1);
            break;
          case 2:
            // console.log('case 2 is happening');
            $player2Lives.text(2);
            break;
          case 3:
            // console.log('case 3 is happening');
            $player2Lives.text(3);
            break;
          case 4:
            // console.log('case 4 is happening');
            $player2Lives.text(4);
            break;
          case 5:
            // console.log('case 5 is happening');
            $player2Lives.text(5);
            break;
        }
        reset(health, lives);
      }
    }
  }
  function pauseLasers(object){
    setTimeout(function(){
      console.log('pauseLasers, noLasers is', object.noLasers);
      object.noLasers = true;
      clearInterval(laserInterval);
    }, 500);
  }
}





function reset(){
  console.log('reset running!');
  player1Object.gravity = true;
  player1Object.airborne = false;
  player1Object.jumping = false;
  player1Object.noLasers = true;
  player1Object.playerDirection = 'right';
  player1Object.health = 3;
  $player1Health.text(3);
  // console.log('player1 lives remaining:', player1Object.lives);

  player2Object.gravity = true;
  player2Object.airborne = false;
  player2Object.jumping = false;
  player2Object.noLasers = true;
  player2Object.playerDirection = 'left';
  player2Object.health = 3;
  $player2Health.text(3);
  // console.log('player2 lives remaining:', player2Object.lives);

  $player1.remove().css({
    top: '400px',
    left: '15px'
  }).appendTo($('main'));

  $player2.remove().css({
    top: '400px',
    left: '597px'
  }).appendTo($('main'));
}
}

$(setup);
