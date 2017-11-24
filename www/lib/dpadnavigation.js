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
        '37': this.moveLeft.bind(this), // Left
        '33': this.channelUp.bind(this), // Channel up
        '34': this.channelDown.bind(this), // Channel down
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
        console.log(keyCode);
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

/**
 * @return {?HTMLElement}
 */
DPadNavigation.prototype.getSelectedRow = function() {
    var matches = document.getElementsByClassName('selected-row');
    if (matches.length === 0) {
        return null;
    } else if (matches.length > 1) {
        console.warn(matches.length + ' row selected');
        return matches[0];
    }
    return matches[0];
};

/**
 * @return {?HTMLElement}
 */
DPadNavigation.prototype.getSelectedItem = function() {
    var matches = document.getElementsByClassName('selected-item');
    if (matches.length === 0) {
        return null;
    } else if (matches.length > 1) {
        console.warn(matches.length + ' items selected');
        return matches[0];
    }
    return matches[0];
};

/**
 * -1 left, 1 right
 * @param {number} dx -1 or 1
 */
DPadNavigation.prototype.moveHorizontal = function(dx) {
    var selectedItem = this.getSelectedItem(),
        selectedRow = this.getSelectedRow(),
        firstRow,
        firstItem;

    if (selectedRow === null) {
        firstRow = document.getElementById('live-strip');
        if (firstRow != null) {
            this.selectRow(firstRow);
        }
    }

    selectedRow = this.getSelectedRow();
    if (selectedItem === null) {
        firstItem = selectedRow.getElementsByClassName('selectable-item')[0];
        if (firstItem != null) {
            this.selectItem(firstItem);
        }
        return;
    }


    var selectableItemsOnRow = [].slice.call(selectedRow.getElementsByClassName('selectable-item'));
    var selectedIndex = selectableItemsOnRow.indexOf(selectedItem);

    selectedIndex += dx;
    selectedIndex = selectedIndex.clamp(0, selectableItemsOnRow.length - 1);

    this.selectItem(selectableItemsOnRow[selectedIndex]);
};


/**
 * -1 up, 1 down
 * @param {number} dy -1 or 1
 */
DPadNavigation.prototype.moveVertical = function(dy) {
    var selectedItem = this.getSelectedItem(),
        selectedRow = this.getSelectedRow(),
        firstRow,
        firstItem;

    if (selectedRow === null) {
        firstRow = document.getElementById('live-strip');
        if (firstRow != null) {
            this.selectRow(firstRow);
        }
    }

    selectedRow = this.getSelectedRow();
    if (selectedItem === null) {
        firstItem = selectedRow.getElementsByClassName('selectable-item')[0];
        if (firstItem != null) {
            this.selectItem(firstItem);
        }
        return;
    }

    var selectableRows = [].slice.call(document.getElementsByClassName('selectable-row'));
    console.log(selectableRows);
    console.log('fubar');
    var selectedIndex = selectableRows.indexOf(selectedRow);

    selectedIndex += dy;
    selectedIndex = selectedIndex.clamp(0, selectableRows.length - 1);
    this.selectRow(selectableRows[selectedIndex]);
    this.selectItem(selectableRows[selectedIndex].getElementsByClassName('selectable-item')[0])
};

/**
 * Selects this item.
 * @param {Element} item
 */
DPadNavigation.prototype.selectItem = function(item) {
    var selectedItem = this.getSelectedItem();

    // Current selected item, should not be selected anymore.
    if (selectedItem !== null) {
        selectedItem.classList.remove('selected-item');
    }
    item.classList.add('selected-item');
    item.focus();
    this.layoutStrip();
};

/**
 * Selects this item.
 * @param {Element} row
 */
DPadNavigation.prototype.selectRow = function(row) {
    var selectedRow = this.getSelectedRow();

    // Current selected item, should not be selected anymore.
    if (selectedRow !== null) {
        selectedRow.classList.remove('selected-row');
    }
    row.classList.add('selected-row');
    // this.layoutStrip();
};

/**
 * Layout selected item.
 */
DPadNavigation.prototype.layoutStrip = function() {
    var item = this.getSelectedItem(),
        row = this.getSelectedRow();

    if (item === null || row === null) {
        return;
    }

    row.scrollLeft = item.offsetLeft - row.offsetWidth * 0.5 + item.offsetWidth * 0.5;
};

/**
 * Move left pressed.
 */
DPadNavigation.prototype.moveLeft = function() {
    this.moveHorizontal(-1);
};

/**
 * Move right pressed.
 */
DPadNavigation.prototype.moveRight = function() {
    this.moveHorizontal(1);
};

/**
 * Move up pressed.
 */
DPadNavigation.prototype.moveUp = function() {
    this.moveVertical(-1);
};

/**
 * Move down pressed.
 */
DPadNavigation.prototype.moveDown = function() {
    this.moveVertical(1);
};

/**
 * Enter pressed.
 */
DPadNavigation.prototype.enter = function() {
    var selectedItem = this.getSelectedItem();

    if (app.videoPlayer.isPlaying()) {
        app.eventHandler.onVideoPlayerClick();
    } else if (selectedItem != null) {
        selectedItem.click();
    }
};

/**
 * Back button pressed.
 *
 */
DPadNavigation.prototype.back = function() {
    app.stateHandler.back();
};


DPadNavigation.prototype.channelUp = function() {
    app.channelManager.changeChannel(1);
};

DPadNavigation.prototype.channelDown = function () {
    app.channelManager.changeChannel(-1);
}