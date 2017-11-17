/**
 * @constructor
 */
VideoPlayer = function() {
    var video = document.getElementById('video'),
        spinner = document.getElementById('spinner'),
        mediaPlayer = document.getElementById('media-player');

    video.addEventListener("click", function(e) {
        app.clickHandler.onVideoPlayerClick(e);
    });
    video.addEventListener('loadeddata', function() {
        spinner.classList.add('hidden');
    });
    video.addEventListener('error', function() {
        spinner.classList.add('hidden');
        mediaPlayer.classList.add('hidden');
        video.classList.add('hidden');
    });
};

/**
 * Show the spinner.
 */
VideoPlayer.prototype.show = function() {
    var video = document.getElementById('video');
    var mediaPlayer = document.getElementById('media-player');
    var spinner = document.getElementById('spinner');

    spinner.classList.remove('hidden');
    mediaPlayer.classList.remove('hidden');
    video.classList.remove('hidden');
};

/**
 * @param {string} url
 */
VideoPlayer.prototype.play = function(url) {
    var video = document.getElementById('video');
    var mediaPlayer = document.getElementById('media-player');
    var spinner = document.getElementById('spinner');
    var isCordova = !!window.cordova;
    var hls;

    try {
        video.src = url;
        if(Hls.isSupported() && !isCordova) {
            hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
        }
        video.play();
    } catch(e) {
        spinner.classList.add('hidden');
        video.classList.add('hidden');
        mediaPlayer.classList.add('hidden');
        console.error(e);
    }
};

/**
 * @return {boolean}
 */
VideoPlayer.prototype.isPlaying = function() {
    var video = document.getElementById('video');
    return !video.paused;
};

/**
 * Stop the play back
 */
VideoPlayer.prototype.stop = function() {
    var video = document.getElementById('video'),
        mediaPlayer = document.getElementById('media-player');

    if (this.isPlaying()) {
        mediaPlayer.classList.add('hidden');
        video.classList.add('hidden');
        video.pause();
        video.currentTime = 0;
        video.removeAttribute('src');
        video.load();
    }
};