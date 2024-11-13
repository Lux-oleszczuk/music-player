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
//drop area variable
const dropArea = document.getElementById("small-container");

//audioPlayer.src is the first song
audioPlayer.src = "assets/DIANNE - After the Storm.mp3"
audioPlayer.volume = 0.5;

let playing = false;

let updatingProgress = false;

// Add event listeners to handle drag-and-drop
dropArea.addEventListener('dragenter', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropArea.classList.add('highlight'); // Add a highlight to show it's a drop area
});

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropArea.classList.add('highlight'); // Continue showing highlight while dragging over
});

dropArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropArea.classList.remove('highlight'); // Remove highlight when leaving the drop area
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropArea.classList.remove('highlight'); // Remove highlight after dropping

    // Get the dropped file
    const files = e.dataTransfer.files;

    if (files.length) {
        const file = files[0];

        // Ensure it's an audio file
        if (file.type === "audio/mp3" || file.type === "audio/mpeg" || file.type === "audio/M4A") {
            // Create a URL for the audio player
            const fileURL = URL.createObjectURL(file);
            audioPlayer.src = fileURL;

            // Play the audio
            audioPlayer.play();
            playing = true;
            playPauseButton.innerHTML = '<i class="fa-solid fa-pause"></i>';

            // Update track info (if needed, otherwise you can remove this part)
            const trackInfo = document.querySelector("#small-container p span");
            trackInfo.innerText = file.name.replace(".mp3", "M4A");
        } else {
            alert("Please drop a valid MP3 file.");
        }
    }
});

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
