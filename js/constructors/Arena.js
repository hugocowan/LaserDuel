class Arena {

    constructor(arenaName) {

        if (document.getElementsByTagName('main')[0]) {
            document.getElementsByTagName('body')[0].removeChild(document.getElementsByTagName('main')[0]);
        }


        const arena = document.createElement('main'),
            platformContainer = document.createElement('div'),
            body = document.getElementsByClassName('border')[0];

        arena.setAttribute('class', arenaName);
        platformContainer.setAttribute('class', 'platforms');

        body.appendChild(arena);
        arena.appendChild(platformContainer);

        this.html = arena;
        this.rect = null;
    }


    getRect() {
        return this.rect;
    }

    setRect() {
        return this.rect = this.html.getBoundingClientRect();
    }

    static getPlayableWidth() {
        return arena.html.clientWidth - playerOne.html.clientWidth;
    }
}