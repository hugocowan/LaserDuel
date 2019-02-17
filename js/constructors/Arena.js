class Arena {

    constructor(arenaName) {

        const arena = document.createElement('main'),
            platformContainer = document.createElement('div'),
            body = document.getElementsByClassName('border')[0];

        arena.setAttribute('class', arenaName);
        platformContainer.setAttribute('class', 'platforms');

        body.appendChild(arena);
        arena.appendChild(platformContainer);

        this.html = arena;
    }


    getRect() {
        return this.html.getBoundingClientRect();
    }

    static getPlayableWidth() {
        return arena.html.clientWidth - playerOne.body.clientWidth;
    }
}