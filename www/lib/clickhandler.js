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
    app.videoPlayer.play(item.dataset.videoUrl);
};