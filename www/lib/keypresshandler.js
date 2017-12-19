/**
 * @constructor
 */
KeypressHandler = function() {

    /**
     * @type {Object<number, function()>}
     */
    this.keyDownCodeMap = {};

    /**
     * @type {Object<number, function()>}
     */
    this.keyUpCodeMap = {};

    // Register event listeners.
    window.addEventListener('keydown', function(e) {
        var keyCode = e.keyCode;
        if (this.keyDownCodeMap[keyCode]) {
            this.keyDownCodeMap[keyCode]();
            e.preventDefault();
        }
    }.bind(this));
    window.addEventListener('keyup', function(e) {
        var keyCode = e.keyCode;
        if (this.keyUpCodeMap[keyCode]) {
            this.keyUpCodeMap[keyCode]();
            e.preventDefault();
        }
    }.bind(this));

    document.addEventListener("backbutton", function() {
        app.stateHandler.back();
    }, false);
};


KeypressHandler.prototype.init = function() {
    var selectionHandler = app.selectionHandler;
    var eventHandler = app.eventHandler;

    /**
     * @type {Object<number, function()>}
     */
    this.keyDownCodeMap = {
        '40': selectionHandler.moveDown.bind(selectionHandler), // Down
        '39': selectionHandler.moveRight.bind(selectionHandler), // Right
        '38': selectionHandler.moveUp.bind(selectionHandler), // Up
        '37': selectionHandler.moveLeft.bind(selectionHandler) // Left
    };

    /**
     * @type {Object<number, function()>}
     */
    this.keyUpCodeMap = {
        '13': eventHandler.clickSelectedItem.bind(eventHandler), // Enter
        '27': eventHandler.onEscapePressed.bind(eventHandler), // Escape
        '8': eventHandler.onBackspacePressed.bind(eventHandler), // Backspace
        '33': eventHandler.onForwardPressed.bind(eventHandler), // Page Up
        '34': eventHandler.onBackwardPressed.bind(eventHandler), // Page Down

        '179': eventHandler.onPlayPausePressed.bind(eventHandler), // Play/Pause

        '227': null, // Backward.
        '228': null // Forward.

        // '175': eventHandler.onVolumeUpPressed.bind(eventHandler), // Volume up
        // '174': eventHandler.onVolumeDownPressed.bind(eventHandler) // Volume down
    };
};
