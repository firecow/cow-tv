/**
 * @constructor
 */
VideoPlayer = function() {
    var video = document.getElementById('video'),
        spinner = document.getElementById('spinner'),
        mediaPlayer = document.getElementById('media-player');

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
 * @param {string} url
 */
VideoPlayer.prototype.play = function(url) {
    var video = document.getElementById('video'),
        mediaPlayer = document.getElementById('media-player'),
        spinner = document.getElementById('spinner'),
        hls;

    spinner.classList.remove('hidden');
    mediaPlayer.classList.remove('hidden');
    video.classList.remove('hidden');

    try {
        video.src = url;
        if(Hls.isSupported()) {
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