/**
 * @constructor
 */
FullscreenApi = function() {
    var fullscreenIcon = document.getElementById('fullscreen-icon'),
        clickFunction;

    if (this.isFullscreenSupported()) {
        clickFunction = function() {
            this.toggleFullscreen();
            document.getElementById('fullscreen-enabled').classList.toggle('hidden');
            document.getElementById('fullscreen-disabled').classList.toggle('hidden');
        }.bind(this);
        fullscreenIcon.addEventListener('touchend', clickFunction);
        fullscreenIcon.addEventListener('mouseup', clickFunction);
        fullscreenIcon.classList.remove('hidden');
    }

};

/**
 * Toggles fullscreen mode on and off.
 */
FullscreenApi.prototype.toggleFullscreen = function() {
    if (this.isFullscreenSupported()) {
        if (this.isInFullscreen()) {
            this.exitFullscreen();
        } else {
            this.requestFullscreen();
        }
    } else {
        console.error('Toggle fullscreen shouldn\'t be called, when not supported');
    }
};

/**
 * Is fullscreen currently active.
 * @return {boolean}
 */
FullscreenApi.prototype.isInFullscreen = function() {
    if (window.cordova) {
        return false;
    }
    return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullscreenElement || document.msFullscreenElement || false;
};

/**
 * Is fullscreen supported.
 * @return {boolean}
 */
FullscreenApi.prototype.isFullscreenSupported = function() {
    if (window.cordova) {
        return false;
    }
    return document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullscreenEnabled || document.mozFullscreenEnabled || false;
};


/**
 * Request body to be placed as fullscreen.
 */
FullscreenApi.prototype.requestFullscreen = function() {
    var elem = document.body;

    if (elem.requestFullscreen) { // W3C API
        elem.requestFullscreen();
    } else if (elem.mozRequestFullscreen) { // Mozilla current API
        elem.mozRequestFullscreen();
    } else if (elem.webkitRequestFullscreen) { // Webkit current API
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // MS current API
        elem.msRequestFullscreen();
    } else {
        console.error('No requestFullscreen support');
    }
};


/**
 * Request body to be placed as fullscreen.
 */
FullscreenApi.prototype.exitFullscreen = function() {
    if (document.exitFullscreen) { // W3C API
        document.exitFullscreen();
    } else if (document.mozExitFullscreen) { // Mozilla current API
        document.mozExitFullscreen();
    } else if (document.webkitExitFullscreen) { // Webkit current API
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // MS current API
        document.msExitFullscreen();
    } else {
        console.error('No exitFullscreen support');
    }
};