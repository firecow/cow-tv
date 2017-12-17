/**
 * @constructor
 */
StateHandler = function() {
    this.videoChannel = document.getElementById('video-channel');
    this.videoProgram = document.getElementById('video-program');
    this.spinner = document.getElementById('spinner');
    this.home = document.getElementById('home');

    window.addEventListener('popstate', function(e) {
        this.setState(e.state);
    }.bind(this));
};

/**
 * Initializes the statehandler to window.history.state
 */
StateHandler.prototype.init = function() {
    this.setState(history.state);
};

/**
 * @return {string}
 */
StateHandler.prototype.getCurrentStateType = function() {
    return history.state ? history.state.type : 'home';
};

/**
 * @return {Element}
 */
StateHandler.prototype.getCurrentStateMainElement = function() {
    var currentStateType = this.getCurrentStateType();
    var element = document.getElementById(currentStateType);
    if (!element) {
        throw new Error('No main element found for state type. ' + currentStateType);
    }
    return element;
};

/**
 * @param {*} state
 */
StateHandler.prototype.setState = function(state) {
    if (state === null) {
        app.animator.fadeIn([this.home]);
        app.animator.fadeOut([this.spinner, this.videoChannel, this.videoProgram]);
        this.videoChannel.player.stop();
        this.videoProgram.player.stop();
        // Gogo home screen.
        return;
    }

    switch (state.type) {
        case "video-channel":
            app.animator.fadeIn([this.videoChannel, this.spinner]);
            app.animator.fadeOut([this.home, this.videoProgram]);
            this.videoProgram.player.stop();
            this.videoChannel.player.load(state.streamingUrl);
            break;
        case "video-program":
            app.animator.fadeIn([this.videoProgram, this.spinner]);
            app.animator.fadeOut([this.home, this.videoChannel]);
            this.videoChannel.player.stop();
            this.videoProgram.player.load(state.streamingUrl);
            break;
    }
};

/**
 * Play or pause.
 */
StateHandler.prototype.playPause = function() {
    var stateType = this.getCurrentStateType();
    switch (stateType) {
        case "video-program":
            this.videoProgram.player.togglePlayPause();
            break;
    }
};

/**
 * Go back in history.
 */
StateHandler.prototype.back = function() {
    // Don't leave app window, if all states have been popped.
    if (window.history.state == null) {
        if (app.device.isCordova()) {
            navigator.app.exitApp(); // Cordova specific call.
        }
        return;
    }

    window.history.back();
};

/**
 * @param {*} stateObject
 */
StateHandler.prototype.pushState = function(stateObject) {
    window.history.pushState(stateObject, stateObject.type);
    this.setState(stateObject);
};
