/**
 * @constructor
 */
var DPadNavigation = function() {

    /**
     * @type {HTMLElement}
     */
    this.liveStrip = document.getElementById('live-strip');

    /**
     * @type {Object<number, function()>}
     */
    this.keyDownCodeMap = {
        '40': this.moveDown.bind(this), // Down
        '39': this.moveRight.bind(this), // Right
        '38': this.moveUp.bind(this), // Up
        '37': this.moveLeft.bind(this) // Left
    };

    /**
     * @type {Object<number, function()>}
     */
    this.keyUpCodeMap = {
        '13': this.enter.bind(this), // Enter
        '27': this.back.bind(this), // Escape
        '8': this.back.bind(this) // Backspace
    };

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

    /**
     * @type {HTMLDivElement}
     */
    this.liveChildren = document.getElementById('live_children');
};


/**
 * @return {?HTMLElement}
 */
DPadNavigation.prototype.getSelectedItem = function() {
    var matches = document.querySelectorAll('.item.selected');
    if (matches.length === 0) {
        return null;
    } else if (matches.length > 1) {
        console.warn(matches.length + ' items selected');
        return matches[0];
    }
    return matches[0];
};

/**
 * @param {number} dx
 * @param {number} dy
 */
DPadNavigation.prototype.moveCursor = function(dx, dy) {
    var selectedItem = this.getSelectedItem(),
        newSelectedItem = null;

    newSelectedItem = dx === -1 ? selectedItem.previousSibling || newSelectedItem : newSelectedItem;
    newSelectedItem = dx === 1 ? selectedItem.nextSibling || newSelectedItem : newSelectedItem;

    if (newSelectedItem !== null) {
        this.selectItem(newSelectedItem);
    }
};

/**
 * Selects this item.
 * @param {HTMLElement} item
 */
DPadNavigation.prototype.selectItem = function(item) {
    var selectedItem = this.getSelectedItem();

    // Move selected
    if (selectedItem !== null) {
        selectedItem.classList.remove('selected');
    }
    item.classList.add('selected');
    this.layoutStrip();
};

/**
 * Layout selected item.
 */
DPadNavigation.prototype.layoutStrip = function() {
    var item = this.getSelectedItem();

    if (item === null) {
        return;
    }

    this.liveStrip.scrollLeft = item.offsetLeft - this.liveStrip.offsetWidth * 0.5 + item.offsetWidth * 0.5;
};

/**
 * Move left pressed.
 */
DPadNavigation.prototype.moveLeft = function() {
    this.moveCursor(-1, 0);
};

/**
 * Move right pressed.
 */
DPadNavigation.prototype.moveRight = function() {
    this.moveCursor(1, 0);
};

/**
 * Move up pressed.
 */
DPadNavigation.prototype.moveUp = function() {
    this.moveCursor(0, -1);
};

/**
 * Move down pressed.
 */
DPadNavigation.prototype.moveDown = function() {
    this.moveCursor(0, 1);
};

/**
 * Enter pressed.
 */
DPadNavigation.prototype.enter = function() {

};

/**
 * Back button pressed.
 */
DPadNavigation.prototype.back = function() {

};