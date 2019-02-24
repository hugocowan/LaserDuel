//Set scoreboards and reset lives/health/player positions

function reset(opponent) {

    if (opponent.health > 1) {

        opponent.health--;
        playerOne.healthHTML.innerText = playerOne.health;
        playerTwo.healthHTML.innerText = playerTwo.health;
        return;
    }

    opponent.lives--;
    opponent.health = 3;
    opponent.healthHTML.innerText = 3;
    opponent.livesHTML.innerText = opponent.lives;

    if (playerTwo.lives === 0 || playerOne.lives === 0) {

        playerOne.healthHTML.innerText = 0;
        modal = new Modal(`${opponent === playerOne ? playerTwo.name : playerOne.name} Wins the game!!! WOOOOOO`, 'Next Match');

    } else {

        modal = new Modal(`${opponent === playerOne ? playerTwo.name : playerOne.name} wins the round!`, 'Next Round');
    }

}