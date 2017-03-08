/**
 * @constructor
 */
FullscreenApi = function() {

};

/**
 * Request body to be placed as fullscreen.
 */
FullscreenApi.prototype.requestFullscreen = function() {
    var elem = document.body;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.mozRequestFullscreen) {
        elem.mozRequestFullscreen();
    } else {
        console.warn('No request fullscreen');
    }
};

/**
 * Request to exit fullscreen mode.
 */
FullscreenApi.prototype.exitFullscreen = function() {
    var elem = document;
    if (elem.exitFullscreen) {
        elem.exitFullscreen();
    } else if (elem.webkitExitFullscreen) {
        elem.webkitExitFullscreen();
    } else if (elem.mozExitFullscreen) {
        elem.mozExitFullscreen();
    } else {
        console.warn('No exit fullscreen');
    }
};