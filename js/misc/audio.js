// Play the pew pew and pain sound effects

function playSoundEffect(name, ext) {
    const audioTag = document.createElement('audio');
    audioTag.setAttribute('src', `./audio/${name}.${ext}`);
    audioTag.play();
    audioTag.remove();
}