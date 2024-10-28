// create a ne audioplayer object
const audioPlayer = new Audio();
//select the playPauseButton element
const playPauseButton = document.getElementById("play-button");

const progressSlider = document.getElementById("progress-slider");
//audioPlayer.src is the first song
audioPlayer.src = "assets/DIANNE - After the Storm.mp3"
audioPlayer.volume = 0,5;

let playing = false;

let updatingProgress = false;

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
    progressSlider.max = audioPlayer.duration;

    durationText.innerHTML = secondsToMMSS(audioPlayer, duration);
}

function onTimeUpdate() {
    progressSlider.value = audioPlayer.currentTime;
}
function onEnd() {
    progressSlider.value = 0;
    playPauseButton.innerHTML = "play";
    playing = false;
}

playPauseButton.onclick = onPlayPauseClick;
audioPlayer.onloadedmetadata = onLoadedMetadata;
audioPlayer.ontimeupdate = onTimeUpdate;
audioPlayer.onended = onEnd;