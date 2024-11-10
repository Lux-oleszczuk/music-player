// create a new audio player object
const audioPlayer = new Audio();
//select the playPauseButton element
const playPauseButton = document.getElementById("play-button");
// select the progress slider
const progressSlider = document.getElementById("progress-slider");
// select volume slider
const volumeSlider = document.getElementById("volume-slider");
// text span change
const progressText = document.getElementById("progress-text");
const durationText = document.getElementById("duration-text");

//audioPlayer.src is the first song
audioPlayer.src = "assets/DIANNE - After the Storm.mp3"
audioPlayer.volume = 0.5;

let playing = false;

let updatingProgress = false;

/**
 * if audio player is not playing -> play sound
 * if playing -> pause
 */

function onPlayPauseClick() {
    if (playing) {
        audioPlayer.pause();
        playPauseButton.innerHTML = '<i class="fa-solid fa-play"></i>';
        playing = false;
    } else {
        audioPlayer.play();
        playPauseButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
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
    playPauseButton.innerHTML = '<i class="fa-solid fa-play"></i>';
    playing = false;
    progressText.innerHTML = "00:00";
}

/**
 *  take value of the volumeSlider and update the audioPlayer.volume
 */
function onVolumeSliderChange() {
    audioPlayer.volume = volumeSlider.value * 0.01;
}

/**
 * onProgressMouseDown updates the updatingProgress boolean to mark that the user is updating the progressSlider
 */
function onProgressMouseDown() {
    updatingProgress = true;
}

/**
 * onProgressSliderChange updates the currentTime of the audioPlayer to the value of the progressSlider and sets updatingProgress to false to mark that the user is not moving the slider anymore
 */
function onProgressSliderChange() {
    audioPlayer.currentTime = progressSlider.value;
    updatingProgress = false;
}

/**
 * 
 * @param {number} seconds time in seconds
 * @returns time formatted as "MM:SS"
 */
function secondsToMMSS(seconds) {
    const integerSeconds = parseInt(seconds);

    // for minute calculation
    let MM = parseInt(integerSeconds / 60);
    if (MM < 10) MM = "0" + MM;

    // for second calculation
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
volumeSlider.oninput = onVolumeSliderChange;

//events of progress slider
progressSlider.oninput = onProgressSliderChange;
progressSlider.onmousedown = onProgressMouseDown;
progressSlider.onmouseup = () => updatingProgress = true; // Additional event to ensure updatingProgress is "true" after mouse release
