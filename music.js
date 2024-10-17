// create a ne audioplayer object
const audioPlayer = new Audio();
//select the playPauseButton element
const playPauseButton = document.getElementById("play-button");
//audioPlayer.src is the first song
audioPlayer.src = "assets/DIANNE - After the Storm.mp3"

let playing = false;

/**
 * if audio player is not playing -> play sound
 * if olaying -> pause
 */

function onPlayPauseClick() {
    if(playing) {
        audioPlayer.pause();
        playPauseButton.innerHTML = "Play";
        playing = false;
    } else {
        audioPlayer.play();
        playPauseButton.innerHTML = "pause";
        playing = true;
    }
}

function onLoadedMetadata() {
    console.log(audioPlayer, duration);
}

playPauseButton.onclick = onPlayPauseClick;
