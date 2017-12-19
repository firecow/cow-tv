/**
 * @constructor
 */
StateHandler = function() {
    this.videoChannel = document.getElementById('video-channel');
    this.videoProgram = document.getElementById('video-program');
    this.spinner = document.getElementById('spinner');
    this.home = document.getElementById('home');

    window.addEventListener('popstate', function(e) {
        this.doStateChange(e.state);
    }.bind(this));
};

/**
 * Initializes the statehandler to window.history.state
 */
StateHandler.prototype.init = function() {
    this.doStateChange(history.state);
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
StateHandler.prototype.doStateChange = function(state) {
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
            this.videoChannel.dataset.slug = state.slug;
            this.videoChannel.player.load(state.streamingUrl);
            break;
        case "video-program":
            app.animator.fadeIn([this.videoProgram, this.spinner]);
            app.animator.fadeOut([this.home, this.videoChannel]);
            this.videoChannel.player.stop();
            this.videoProgram.dataset.slug = state.slug;
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
    this.doStateChange(stateObject);
};

/**
 * @param {*} stateObject
 */
StateHandler.prototype.replaceState = function(stateObject) {
    window.history.replaceState(stateObject, stateObject.type);
    this.doStateChange(stateObject);
};

/**
 * Skip forwards.
 */
StateHandler.prototype.skipForward = function() {
    var stateType = this.getCurrentStateType();
    switch (stateType) {
        case "video-channel":
            var currentSlug = this.videoChannel.dataset.slug;
            var elements = Array.from(document.getElementsByClassName("channel"));
            var channelCount = elements.length;
            var currentIndex = elements.findIndex(function(e) {
                return e.dataset.slug === currentSlug;
            });
            var newIndex = (currentIndex + 1) % channelCount;
            var newItem = elements[newIndex];
            this.replaceState({
                type: "video-channel",
                slug: newItem.dataset.slug,
                streamingUrl: newItem.dataset.videoUrl
            });
            break;
    }
};

/**
 * Skip backwards.
 */
StateHandler.prototype.skipBackward = function() {
    var stateType = this.getCurrentStateType();
    switch (stateType) {
        case "video-channel":
            var currentSlug = this.videoChannel.dataset.slug;
            var elements = Array.from(document.getElementsByClassName("channel"));
            var channelCount = elements.length;
            var currentIndex = elements.findIndex(function(e) {
                return e.dataset.slug === currentSlug;
            });
            var newIndex = (currentIndex - 1) % channelCount;
            newIndex = newIndex == -1 ? channelCount - 1 : newIndex;
            var newItem = elements[newIndex];
            this.replaceState({
                type: "video-channel",
                slug: newItem.dataset.slug,
                streamingUrl: newItem.dataset.videoUrl
            });
            break;
    }
};
