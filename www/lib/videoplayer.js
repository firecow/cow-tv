/**
 * @constructor
 */
VideoPlayer = function(element) {
    this.video = element;
    this.video.addEventListener("click", function() {
        app.eventHandler.onVideoPlayerClick(element);
    });
    this.video.addEventListener('playing', function() {
        app.eventHandler.onVideoPlaying(element);
    });
    this.video.addEventListener('error', function() {
        app.eventHandler.onVideoPlayError(element);
    });

    // Debug logs.
    this.video.addEventListener('play', function(e) {
        console.log(e.type, e);
    });
    this.video.addEventListener('canplaythrough', function(e) {
        console.log(e.type, e);
    });
    this.video.addEventListener('canplay', function(e) {
        console.log(e.type, e);
    });
    this.video.addEventListener('loadeddata', function(e) {
        console.log(e.type, e);
    });
    this.video.addEventListener('loadedmetadata', function(e) {
        console.log(e.type, e);
    });
    this.video.addEventListener('pause', function(e) {
        console.log(e.type, e);
    });

    this.video.addEventListener('playing', function(e) {
        console.log(e.type, e);
    });
    this.video.addEventListener('waiting', function(e) {
        console.log(e.type, e);
    });
};

/**
 * @param {string} url
 */
VideoPlayer.prototype.play = function(url) {
    var hls;

    try {
        if (Hls.isSupported() && !app.device.isCordova() && !app.device.isWebOS()) {
            hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(this.video);
        } else {
            this.video.src = url;
        }
        this.video.play();
    } catch (e) {
        app.eventHandler.onVideoPlayError();
        console.error(e);
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
        this.video.pause();
        this.video.currentTime = 0;
        this.video.removeAttribute('src');
        this.video.load();
    }
};