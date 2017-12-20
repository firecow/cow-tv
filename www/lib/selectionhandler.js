/**
 * Handles selections changes, based on current state type.
 * @constructor
 */
var SelectionHandler = function() {

};


/**
 * A DPad enter button have been pressed. (Enter, OK)
 */
SelectionHandler.prototype.clickSelectedItem = function() {
    var mainElement = app.stateHandler.getCurrentStateMainElement();
    var row = this.getSelectedRow(mainElement);
    var item = this.getSelectedItem(row);
    item.click();
    item.focus();
};

/**
 * DPad move up have been pressed.
 */
SelectionHandler.prototype.moveUp = function() {
    var mainElement = app.stateHandler.getCurrentStateMainElement();
    var selectedRow = this.getSelectedRow(mainElement);

    var currentStateElement = app.stateHandler.getCurrentStateMainElement();
    var selectableRows = Array.from(currentStateElement.getElementsByClassName('selectable-row'));
    var selectedIndex = selectableRows.indexOf(selectedRow);

    selectedIndex += -1;
    selectedIndex = selectedIndex.clamp(0, selectableRows.length - 1);
    this.selectRow(selectedRow, selectableRows[selectedIndex]);
};

/**
 * DPad move down have been pressed.
 */
SelectionHandler.prototype.moveDown = function() {
    var mainElement = app.stateHandler.getCurrentStateMainElement();
    var selectedRow = this.getSelectedRow(mainElement);

    var currentStateElement = app.stateHandler.getCurrentStateMainElement();
    var selectableRows = Array.from(currentStateElement.getElementsByClassName('selectable-row'));
    var selectedIndex = selectableRows.indexOf(selectedRow);

    selectedIndex += 1;
    selectedIndex = selectedIndex.clamp(0, selectableRows.length - 1);
    this.selectRow(selectedRow, selectableRows[selectedIndex]);
};


/**
 * DPad move left have been pressed.
 */
SelectionHandler.prototype.moveLeft = function() {
    var mainElement = app.stateHandler.getCurrentStateMainElement();
    var selectedRow = this.getSelectedRow(mainElement);
    var selectedItem = this.getSelectedItem(selectedRow);

    var selectableItemsOnRow = Array.from(selectedRow.getElementsByClassName('selectable-item'));
    var selectedIndex = selectableItemsOnRow.indexOf(selectedItem);

    selectedIndex += -1;
    selectedIndex = selectedIndex.clamp(0, selectableItemsOnRow.length - 1);

    this.selectItem(selectedRow, selectableItemsOnRow[selectedIndex]);
};

/**
 * DPad move right have been pressed.
 */
SelectionHandler.prototype.moveRight = function() {
    var mainElement = app.stateHandler.getCurrentStateMainElement();
    var selectedRow = this.getSelectedRow(mainElement);
    var selectedItem = this.getSelectedItem(selectedRow);

    var selectableItemsOnRow = Array.from(selectedRow.getElementsByClassName('selectable-item'));
    var selectedIndex = selectableItemsOnRow.indexOf(selectedItem);

    selectedIndex += 1;
    selectedIndex = selectedIndex.clamp(0, selectableItemsOnRow.length - 1);

    this.selectItem(selectedRow, selectableItemsOnRow[selectedIndex]);
};

/**
 * @param {Element} row
 * @return {Element}
 */
SelectionHandler.prototype.getSelectedItem = function(row) {
    if (row.classList.contains('selected-item')) {
        return row;
    }

    var matches = row.getElementsByClassName('selected-item');
    if (matches.length !== 1) {
        throw new Error(matches.length + ' items selected');
    }
    return matches[0];
};

/**
 * @param {Element} mainElement
 * @return {Element}
 */
SelectionHandler.prototype.getSelectedRow = function(mainElement) {
    if (mainElement.classList.contains('selected-row')) {
        return mainElement;
    }

    var matches = mainElement.getElementsByClassName('selected-row');
    if (matches.length !== 1) {
        throw new Error(matches.length + ' rows selected');
    }
    return matches[0];
};

/**
 * Selects this item.
 * @param {Element} row
 * @param {Element} to
 */
SelectionHandler.prototype.selectItem = function(row, to) {
    var from = this.getSelectedItem(row);
    if (from !== null) {
        from.classList.remove('selected-item');
    }
    to.classList.add('selected-item');
    this.layoutStrip(row, to);
};

/**
 * @param {Element} from
 * @param {Element} to
 */
SelectionHandler.prototype.selectRow = function(from, to) {
    if (from !== null) {
        from.classList.remove('selected-row');
    }
    to.classList.add('selected-row');
};

/**
 * Layout selected item.
 * @param {Element} row
 * @param {Element} item
 */
SelectionHandler.prototype.layoutStrip = function(row, item) {
    if (item === null) {
        return;
    }

    row.scrollLeft = item.offsetLeft - row.offsetWidth * 0.5 + item.offsetWidth * 0.5;
};
