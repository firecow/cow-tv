/**
 * @constructor
 */
var VideoPlayer = function() {

    /**
     * @type {HTMLDivElement}
     */
    this.mediaPlayer = document.getElementById('media-player');

    /**
     * @type {HTMLVideoElement}
     */
    this.video = document.getElementById('video');
};


/**
 * @param {string} url
 */
VideoPlayer.prototype.play = function(url) {
    var video = this.video,
        hls;

    console.log(url);
    this.mediaPlayer.classList.remove('hidden');
    if(Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
    } else {
        this.video.src = url;
        this.video.autoplay = true;
    }

};

/**
 * @return {boolean}
 */
VideoPlayer.prototype.isPlaying = function() {
    return !this.video.paused;
};

/**
 * Stop the play back
 */
VideoPlayer.prototype.stop = function() {
    if (this.isPlaying()) {
        this.mediaPlayer.classList.add('hidden');
        this.video.pause();
    }
};