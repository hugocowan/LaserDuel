class Arena {

    constructor(level) {

        const oldArena = document.getElementsByTagName('main')[0],
            arena = document.createElement('main'),
            platformContainer = document.createElement('div'),
            body = document.getElementsByClassName('border')[0];

        if (oldArena) {
            document.getElementsByClassName('border')[0].removeChild(oldArena);
        }

        arena.setAttribute('class', level);
        platformContainer.setAttribute('class', 'platforms');

        body.appendChild(arena);
        arena.appendChild(platformContainer);

        function createPlatforms(platformData) {

            platforms = [];
            platformData.forEach(function (platform) {
                platforms.push(new Platform(platform.top, platform.left, platform.width, platform.height));
            });
        }

        if (level === 1) {

            createPlatforms([
                {top: '150px', left: '5%', width: '209px'}, {top: '150px', left: '62.4%', width: '209px'},
                {top: '260px', left: '0'}, {top: '260px', left: '84.4%'},
                {top: '370px', left: '10%'}, {top: '370px', left: '42%'}, {top: '370px', left: '74.4%'}
            ]);

        } else if (level === 2) {

            createPlatforms([
                {top: '150px', left: '10%'}, {top: '150px', left: '42%'}, {top: '150px', left: '74.4%'},
                {top: '260px', left: '0'}, {top: '260px', left: '84.4%'},
                {top: '370px', left: '5%', width: '209px'}, {top: '370px', left: '62.4%', width: '209px'}
            ]);

        } else if (level === 3) {

            createPlatforms([
                {top: '150px', left: '10%'}, {top: '150px', left: '42%'}, {top: '150px', left: '74.4%'},
                {top: '260px', left: '5%', width: '209px'}, {top: '260px', left: '62.4%', width: '209px'},
                {top: '370px', left: '0'}, {top: '370px', left: '84.4%'}
            ]);

        }

        this.html = arena;
        this.rect = null;
        this.level = level;

        ball = new Ball(arena);
        playerOne = new Player(arena, 'Player 1');
        playerTwo = new Player(arena, 'Player 2');
    }


    getRect() {
        return this.rect;
    }

    setRect() {
        return this.rect = this.html.getBoundingClientRect();
    }

    getPlayableWidth(player) {
        return this.html.clientWidth - player.html.clientWidth;
    }

    getPlayableHeight(player) {
        return this.html.clientHeight - player.html.clientHeight;
    };
}