class Laser {

    constructor(playerGunLeft, playerGunTop) {

        const laser = document.createElement('div'),
            oldLasers = document.getElementsByClassName('laser');

        laser.setAttribute('class', `laser laser-${oldLasers.length}`);
        laser.setAttribute('style', `left: ${playerGunLeft}px; top: ${playerGunTop}px`);

        arena.html.appendChild(laser);

        this.html = laser;
    }


    getRect() {
        return this.html.getBoundingClientRect();
    }


    laserFrame(laser, direction, laserDistance, originalLeft, left) {

        direction === 'right' ? left -= 25 : left += 25;

        let newLeft = parseFloat(originalLeft) - left;

        this.html.style.left = newLeft + 'px'; // show frame

        if (direction === 'right' ? newLeft >= laserDistance : newLeft <= laserDistance) { // check finish condition
            this.html.remove();
            return;
        }

        requestAnimationFrame(function() {
            laser.laserFrame(laser, direction, laserDistance, originalLeft, left);
        });
    }

}