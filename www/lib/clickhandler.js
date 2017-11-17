/**
 * @constructor
 */
ClickHandler = function() {

};

/**
 *
 */
ClickHandler.prototype.onVideoPlayerClick = function() {
    app.videoPlayer.stop();
};

/**
 * @param item
 */
ClickHandler.prototype.onItemClick = function(item) {
    if (item.dataset.type === "Channel") {
        app.videoPlayer.play(item.dataset.videoUrl);
    } else {
        console.warn('Nothing implemented for ' + item.dataset.type);
    }

};