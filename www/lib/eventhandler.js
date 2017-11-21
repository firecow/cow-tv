/**
 * @constructor
 */
EventHandler = function() {
    this.video = document.getElementById('video');
    this.spinner = document.getElementById('spinner');
    this.scaler = document.getElementById('scaler');
};

/**
 *
 */
EventHandler.prototype.onVideoPlayerClick = function() {
    this.showElements([this.scaler]);
    this.hideElements([this.spinner, this.video]);
    app.videoPlayer.stop();
};

/**
 *
 */
EventHandler.prototype.onVideoCanPlayThrough = function() {
    this.hideElements([this.spinner]);
};

/**
 *
 */
EventHandler.prototype.onVideoPlayError = function() {
    this.showElements([this.scaler]);
    this.hideElements([this.spinner, this.video]);
};

/**
 * @param {Element} item
 */
EventHandler.prototype.onItemClicked = function(item) {
    if (item.dataset.type === "Channel") {
        this.onChannelClick(item);
    } else if (item.dataset.type === "ProgramCard"){
        this.onProgramCardClick(item);
    }
};

/**
 * @param {Element} item
 */
EventHandler.prototype.onChannelClick = function(item) {
    this.showElements([this.video, this.spinner]);
    app.videoPlayer.play(item.dataset.videoUrl);
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

        this.showElements([this.video, this.spinner]);
        app.videoPlayer.play(link['Uri']);
    }.bind(this));
};

/**
 * @param {Array<Element>} elements
 */
EventHandler.prototype.showElements = function(elements) {
    elements.forEach(function(ele) {
        ele.classList.remove('hidden');
    });
};

/**
 * @param {Array<Element>} elements
 */
EventHandler.prototype.hideElements = function(elements) {
    elements.forEach(function(ele) {
        ele.classList.add('hidden');
    });
};