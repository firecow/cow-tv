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
        app.videoPlayer.show();
    } else if (item.dataset.type === "ProgramCard") {
        var request = new JsonGetRequest(item.dataset.videoResource);
        request.prepare(function(err, request) {
            var links = request.getData()['Links'];
            var link = links.find(function(l) {
                return l['Target'] == "HLS";
            });

            app.videoPlayer.play(link['Uri']);
        });
        app.videoPlayer.show();
    } else {
        console.warn('Nothing implemented for ' + item.dataset.type);
    }

};