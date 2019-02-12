class Platform {

    constructor() {

        const platform = document.createElement('div'),
            platformContainer = document.getElementsByClassName('platforms')[0],
            existingPlatforms = document.getElementsByClassName('platform').length;

        platform.setAttribute('class', `platform platform-${existingPlatforms + 1}`);
        // platform.setAttribute('style', `top: ${top}; left: ${left}; height: ${height}; width: ${width}`);

        platformContainer.appendChild(platform);

        this.html = document.getElementsByClassName('ball')[0];
    }


    getRect() {
        return this.html.getBoundingClientRect();
    }

    getHTML() {
        return this.html;
    }
}