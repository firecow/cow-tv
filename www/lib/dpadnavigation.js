/**
 * @constructor
 */
DPadNavigation = function() {

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
        newSelectedItem = null,
        firstItem;

    if (selectedItem === null) {
        firstItem = document.getElementsByClassName('item')[0];
        if (firstItem != null) {
            this.selectItem(firstItem);
        }
        return;
    }

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
    var item = this.getSelectedItem(),
        liveStrip = document.getElementById('live-strip');

    if (item === null) {
        return;
    }

    liveStrip.scrollLeft = item.offsetLeft - liveStrip.offsetWidth * 0.5 + item.offsetWidth * 0.5;
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
    var selectedItem = this.getSelectedItem();

    if (app.videoPlayer.isPlaying()) {
        app.clickHandler.onVideoPlayerClick();
    } else if (selectedItem != null) {
        app.clickHandler.onItemClicked(selectedItem);
    }
};

/**
 * Back button pressed.
 *
 */
DPadNavigation.prototype.back = function() {
    if (app.videoPlayer.isPlaying()) {
        app.clickHandler.onVideoPlayerClick();
    }
};