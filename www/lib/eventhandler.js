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
 */
EventHandler.prototype.onVideoPlaying = function() {
    app.animator.fadeOut([this.spinner]);
};

/**
 * Video player have met an error.
 */
EventHandler.prototype.onVideoPlayError = function() {
    app.stateHandler.back();
};


/**
 * A DPad enter button have been pressed. (Enter, OK)
 */
EventHandler.prototype.onDPadClick = function() {
    app.selectionHandler.onDPadClick();
};

/**
 * A DPad back button have been pressed. (Backspace, Backbutton, Escape)
 */
EventHandler.prototype.onDPadBack = function() {
    app.stateHandler.back();
};

/**
 * @param {Element} item
 */
EventHandler.prototype.onChannelClick = function(item) {
    app.stateHandler.pushState({
        type: "video-channel",
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
            streamingUrl: link['Uri']
        });
    }.bind(this));
};
