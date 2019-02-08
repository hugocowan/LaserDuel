class Arena {

    constructor() {

        const arena = document.createElement('main'),
            body = document.getElementsByClassName('border')[0];

        arena.setAttribute('class', `arena-1`);

        body.appendChild(arena);

        this.html = arena;
    }


    getRect() {
        return this.html.getBoundingClientRect();
    }

    getHTML() {
        return this.html;
    }
}