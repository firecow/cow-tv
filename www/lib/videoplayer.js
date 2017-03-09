/**
 * @constructor
 */
var VideoPlayer = function() {

};


/**
 * @param {string} url
 */
VideoPlayer.prototype.play = function(url) {
    var video = document.getElementById('video'),
        mediaPlayer = document.getElementById('media-player'),
        hls;

    console.log(url);
    mediaPlayer.classList.remove('hidden');

    video.src = url;
    if(Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
    }
    video.play();

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
        video.pause();
        video.currentTime = 0;
        video.removeAttribute('src');
        video.load();
    }
};