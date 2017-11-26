/**
 * @constructor
 */
DPadNavigation = function() {

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


DPadNavigation.prototype.init = function() {
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
        '13': eventHandler.onDPadClick.bind(eventHandler), // Enter
        '27': eventHandler.onDPadBack.bind(eventHandler), // Escape
        '8': eventHandler.onDPadBack.bind(eventHandler) // Backspace
    };
};
