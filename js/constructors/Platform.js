class Platform {

    constructor(top, left, width = '100px', height = '20px') {

        const platform = document.createElement('div'),
            platformContainer = document.getElementsByClassName('platforms')[0],
            existingPlatforms = document.getElementsByClassName('platform').length;

        platform.setAttribute('class', `platform platform-${existingPlatforms + 1}`);
        platform.setAttribute('style', `top: ${top}; left: ${left}; height: ${height}; width: ${width}`);

        platformContainer.appendChild(platform);

        this.html = platform;
        this.rect = null;

    }


    getRect() {
        return this.rect;
    }

    setRect() {
        return this.rect = this.html.getBoundingClientRect();
    }
}