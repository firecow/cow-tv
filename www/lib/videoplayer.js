/**
 * @constructor
 */
VideoPlayer = function(videoContainer) {
    /**
     * @type {HTMLVideoElement}
     */
    this.video = videoContainer.getElementsByTagName("video")[0];
    if (this.video == null) {
        throw new Error("No video tag in video container");
    }

    this.video.addEventListener("click", function() {
        app.eventHandler.onVideoPlayerClick(this.video);
    }.bind(this));
    this.video.addEventListener('loadeddata', function() {
        app.eventHandler.onVideoLoaded(this.video);
    }.bind(this));
    this.video.addEventListener('error', function() {
        app.eventHandler.onVideoPlayError(this.video);
    }.bind(this));

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
VideoPlayer.prototype.load = function(url) {
    var hls;

    try {
        if (Hls.isSupported() && !app.device.isCordova() && !app.device.isWebOS()) {
            hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(this.video);
        } else {
            this.video.src = url;
        }
    } catch (e) {
        app.eventHandler.onVideoPlayError();
        console.error(e);
    }
};

/**
 * Toggle play pause.
 */
VideoPlayer.prototype.togglePlayPause = function() {
    if (this.video.paused) {
        this.video.play();
    } else {
        this.video.pause();
    }
};

/**
 * Stop the video player
 */
VideoPlayer.prototype.stop = function() {
    this.video.pause();
    this.video.currentTime = 0;
    this.video.removeAttribute('src');
    this.video.load();
};