/**
 * @constructor
 */
EventHandler = function() {
    this.spinner = document.getElementById('spinner');
};

/**
 * Video player element have been clicked.
 */
EventHandler.prototype.onVideoPlayerClick = function() {
    console.log("Nothing happens onVideoPlayerClick");
};

/**
 * Video player is now playing.
 * @param {HTMLVideoElement} player
 */
EventHandler.prototype.onVideoLoaded = function(player) {
    app.animator.fadeOut([this.spinner]);
    player.play();
};

/**
 * Video player have met an error.
 */
EventHandler.prototype.onVideoPlayError = function() {
    app.stateHandler.back();
};

/**
 * Enter have been pressed.
 */
EventHandler.prototype.clickSelectedItem = function() {
    app.selectionHandler.clickSelectedItem();
};

/**
 * Escape have been pressed.
 */
EventHandler.prototype.onEscapePressed = function() {
    app.stateHandler.back();
};

/**
 * Backspace have been pressed.
 */
EventHandler.prototype.onBackspacePressed = function() {
    app.stateHandler.back();
};

/**
 * Forwad, ProgramUp or Page up have been pressed.
 */
EventHandler.prototype.onForwardPressed = function() {
    app.stateHandler.skipForward();
};

/**
 * Backward, ProgramDown or Page down have been pressed.
 */
EventHandler.prototype.onBackwardPressed = function() {
    app.stateHandler.skipBackward();
};

/**
 *
 */
EventHandler.prototype.onPlayPausePressed = function() {
   app.stateHandler.playPause();
};

// /**
//  * Volume up have been pressed.
//  */
// EventHandler.prototype.onVolumeUpPressed = function() {
//
// };
//
// /**
//  * Volume down have been pressed.
//  */
// EventHandler.prototype.onVolumeDownPressed = function() {
//
// };

/**
 * @param {Element} item
 */
EventHandler.prototype.onChannelClick = function(item) {
    app.stateHandler.pushState({
        type: "video-channel",
        slug: item.dataset.slug,
        streamingUrl: item.dataset.videoUrl
    });
};

/**
 * @param {Element} item
 */
EventHandler.prototype.onProgramCardClick = function(item) {
    var request = new JsonGetRequest(item.dataset.videoResource);
    request.prepare(function(err, request) {
        var links = request.getData()['Links'];
        var link = links.find(function(l) {
            return l['Target'] == "HLS";
        });

        app.stateHandler.pushState({
            type: "video-program",
            slug: item.dataset.slug,
            streamingUrl: link['Uri']
        });
    }.bind(this));
};
