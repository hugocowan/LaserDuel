
# I need to:

* Make an array containing objets with functions changing the player's opacity. Have the index of the array a number. Reduce the index number and then run the indexed function each time a player is hit.

---

## Player to bullet collision:

### Required variables:
* On left/right keypress, var player1/2Direction = 'left'/'right'.

* Track player's and bullet's X/Y coordinates with var player1/2Position and bullet(x)Position (will need multiple bullet positions).

### Steps

* Make bullet divs

* Create bullet div on keypress.
* Give bullet velocity based on player1/2Direction and player1/2Position.

* If `bulletPosition === player1/2Position`, `alert('player2/1 wins!')`.

## Platform collision
### Required variables:
* var platformXCoord = X
* var platformYCoord = Y

### Steps
* When player hits the platform, player loses velocity and has to move around platform.
* If possible, make it so player can move through the bottom of platform but not through the top.
* If `playerPosition === platformYCoord`, `pixelMovement = 0 && player1/2Position = platformYcoord - 1`?.


* Make an array of every platform's top and left coordinates.

* If player goes anywhere between the height and the width, stop player.

### Gravity

* Have constant downward force that is paused when on a platform.

* Could also be paused when jumping.





.

.

.

.

.

.
