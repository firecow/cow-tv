/**
 * @constructor
 */
FullscreenApi = function() {
    var fullscreenIcon = document.getElementById('fullscreen-icon'),
        clickFunction,
        iconChangeFunction;

    if (this.isFullscreenSupported()) {
        iconChangeFunction = function() {
            if (this.isInFullscreen()) {
                document.getElementById('exit-fullscreen').classList.remove('hidden');
                document.getElementById('enable-fullscreen').classList.add('hidden');
            } else {
                document.getElementById('exit-fullscreen').classList.add('hidden');
                document.getElementById('enable-fullscreen').classList.remove('hidden');
            }
        }.bind(this);


        document.addEventListener('fullscreenchange', iconChangeFunction);
        document.addEventListener('webkitfullscreenchange', iconChangeFunction);
        document.addEventListener('mozfullscreenchange', iconChangeFunction);
        document.addEventListener('MSFullscreenChange', iconChangeFunction);

        clickFunction = function() {
            this.toggleFullscreen();
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
    var fullscreenElement;
    if (window.cordova) {
        return false;
    }
    fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullscreenElement || document.msFullscreenElement;
    return fullscreenElement != null;
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