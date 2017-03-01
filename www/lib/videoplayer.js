var VideoPlayer = function() {

    /**
     * @type {HTMLVideoElement}
     */
    this.video = document.getElementById('video');
};


/**
 * @param {string} url
 */
VideoPlayer.prototype.play = function(url) {
    console.log(url);
};