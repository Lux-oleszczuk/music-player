// create a ne audioplayer object
const audioPlayer = new Audio();
//select the playPauseButton element
const playPauseButton = document.getElementById("play-button");
// select the progress slider
const progressSlider = document.getElementById("progress-slider");
// select volume
const volumeSlider = document.getElementById("volume-slider");
// text spam change
const progressText = document.getElementById("progress-text");
const durationText = document.getElementById("progress-slider");

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

    durationText.innerHTML = secondsToMMSS(audioPlayer.duration);
}

function onTimeUpdate() {
    if (!updatingProgress) {
        progressSlider.value = audioPlayer.currentTime;
    }
    progressText.innerHTML = secondsToMMSS(audioPlayer.currentTime);
}
function onEnd() {
    progressSlider.value = 0;
    playPauseButton.innerHTML = "play";
    playing = false;
    progressText.innerHTML = "00/00";
}

/**
 *  take value of the volumeSlider and update the audioPlayer.volume
 */
function onVolumeSliderChange() {
    audioPlayer.volume = volumeSlider.value * 0.01;
}

/**
 * onProgressMouseDown updates the updatingProgress bolean to mark the user is updating the progrssSlider
 */
function onProgressMouseDown() {
    updatingProgress = true;
}
/**
 * onProgressSliderChange updates the currentTime of the audioPlayer to the value of the progressSlider and updatingProgress to false, to mark the user is not moving the slider anymore
 */
function onProgressSliderChange() {
    audioPlayer.currentTime = progressSlider.value;
    updatingProgress = false;
}

/**
 * 
 * @param {number} seconds time in seconds
 * @returns time formatted as "MM/SS"
 */
function secondsToMMSS(seconds) {
    const integerSeconds = parseInt(seconds);

    // for second calculation
    let MM = parseInt(integerSeconds / 60);
    if (MM > 10) MM = "0" + MM;

    let SS = integerSeconds % 60;
    if (SS < 10) SS = "0" + SS;

    return MM + ":" + SS;
}

playPauseButton.onclick = onPlayPauseClick;
//events of audioPlayer
audioPlayer.onloadedmetadata = onLoadedMetadata;
audioPlayer.ontimeupdate = onTimeUpdate;
audioPlayer.onended = onEnd;

//events of volume slider
volumeSlider.onchange = onVolumeSliderChange;

//events of progress slider
progressSlider.onchange = onProgressSliderChange;
progressSlider.onmousedown = onProgressMouseDown;