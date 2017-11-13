/**
 * @constructor
 */
VideoPlayer = function() {
    var video = document.getElementById('video'),
        spinner = document.getElementById('spinner'),
        mediaPlayer = document.getElementById('media-player');

    video.addEventListener('loadstart', function() {
        spinner.classList.remove('hidden');
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
 * @param {string} url
 */
VideoPlayer.prototype.play = function(url, type) {
    var video = document.getElementById('video'),
        mediaPlayer = document.getElementById('media-player'),
        spinner = document.getElementById('spinner'),
        hls;

    console.log(url);
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
        switch(type) {
            case Tile.type.LIVE_CHANNEL:
                app.state = app.states.PLAYING_LIVE_CHANNEL;
                break;
            case Tile.type.EPISODE:
                app.state = app.states.PLAYING_EPISODE;
                break;
        }
    } catch(e) {
        spinner.classList.add('hidden');
        video.classList.add('hidden');
        mediaPlayer.classList.add('hidden');
        app.state = app.states.DEFAULT;
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