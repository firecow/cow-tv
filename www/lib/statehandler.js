/**
 * @constructor
 */
StateHandler = function() {
    this.video = document.getElementById('video');
    this.spinner = document.getElementById('spinner');
    this.scaler = document.getElementById('scaler');

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
 * @param {*} state
 */
StateHandler.prototype.setState = function(state) {
    console.log('Setting state', state);

    if (state === null) {
        app.animator.fadeIn([this.scaler]);
        app.animator.fadeOut([this.spinner, this.video]);
        app.videoPlayer.stop();
        // Gogo home screen.
        return;
    }


    switch (state.type) {
        case "playVideo":
            app.animator.fadeIn([this.video, this.spinner]);
            app.animator.fadeOut([this.scaler]);
            app.videoPlayer.play(state.streamingUrl);
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

