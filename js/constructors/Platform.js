class Platform {

    constructor(top, left, height = '20px', width = '100px') {

        const platform = document.createElement('div'),
            existingPlatforms = document.getElementsByClassName('platform').length,
            platformContainer = document.getElementsByClassName('platforms')[0];

        platform.setAttribute('class', `platform platform-${existingPlatforms + 1}`);
        platform.setAttribute('style', `top: ${top}; left: ${left}; height: ${height}; width: ${width}`);

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