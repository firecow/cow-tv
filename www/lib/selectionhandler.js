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
    var row = this.getSelectedRow();
    var item = this.getSelectedItem(row);
    item.click();
    item.focus();
};

/**
 * DPad move up have been pressed.
 */
SelectionHandler.prototype.moveUp = function() {
    var selectedRow = this.getSelectedRow();

    var currentStateElement = app.stateHandler.getCurrentStateMainElement();
    var selectableRows = [].slice.call(currentStateElement.getElementsByClassName('selectable-row'));
    var selectedIndex = selectableRows.indexOf(selectedRow);

    selectedIndex += -1;
    selectedIndex = selectedIndex.clamp(0, selectableRows.length - 1);
    this.selectRow(selectedRow, selectableRows[selectedIndex]);
};

/**
 * DPad move down have been pressed.
 */
SelectionHandler.prototype.moveDown = function() {
    var selectedRow = this.getSelectedRow();

    var currentStateElement = app.stateHandler.getCurrentStateMainElement();
    var selectableRows = [].slice.call(currentStateElement.getElementsByClassName('selectable-row'));
    var selectedIndex = selectableRows.indexOf(selectedRow);

    selectedIndex += 1;
    selectedIndex = selectedIndex.clamp(0, selectableRows.length - 1);
    this.selectRow(selectedRow, selectableRows[selectedIndex]);
};


/**
 * DPad move left have been pressed.
 */
SelectionHandler.prototype.moveLeft = function() {
    var selectedRow = this.getSelectedRow();
    var selectedItem = this.getSelectedItem(selectedRow);

    var selectableItemsOnRow = [].slice.call(selectedRow.getElementsByClassName('selectable-item'));
    var selectedIndex = selectableItemsOnRow.indexOf(selectedItem);

    selectedIndex += -1;
    selectedIndex = selectedIndex.clamp(0, selectableItemsOnRow.length - 1);

    this.selectItem(selectedItem, selectableItemsOnRow[selectedIndex]);
};

/**
 * DPad move right have been pressed.
 */
SelectionHandler.prototype.moveRight = function() {
    var selectedRow = this.getSelectedRow();
    var selectedItem = this.getSelectedItem(selectedRow);

    var selectableItemsOnRow = [].slice.call(selectedRow.getElementsByClassName('selectable-item'));
    var selectedIndex = selectableItemsOnRow.indexOf(selectedItem);

    selectedIndex += 1;
    selectedIndex = selectedIndex.clamp(0, selectableItemsOnRow.length - 1);

    this.selectItem(selectedItem, selectableItemsOnRow[selectedIndex]);
};

/**
 * @param {Element} selectedRow
 * @return {Element}
 */
SelectionHandler.prototype.getSelectedItem = function(selectedRow) {
    if (selectedRow.classList.contains('selected-item')) {
        return selectedRow;
    }

    var matches = selectedRow.getElementsByClassName('selected-item');
    if (matches.length !== 1) {
        throw new Error(matches.length + ' items selected');
    }
    return matches[0];
};

/**
 * @return {Element}
 */
SelectionHandler.prototype.getSelectedRow = function() {
    var currentStateElement = app.stateHandler.getCurrentStateMainElement();
    if (currentStateElement.classList.contains('selected-row')) {
        return currentStateElement;
    }

    var matches = currentStateElement.getElementsByClassName('selected-row');
    if (matches.length !== 1) {
        throw new Error(matches.length + ' rows selected');
    }
    return matches[0];
};

/**
 * Selects this item.
 * @param {Element} from
 * @param {Element} to
 */
SelectionHandler.prototype.selectItem = function(from, to) {
    if (from !== null) {
        from.classList.remove('selected-item');
    }
    to.classList.add('selected-item');
    this.layoutStrip();
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
 */
SelectionHandler.prototype.layoutStrip = function() {
    var row = this.getSelectedRow(),
        item = this.getSelectedItem(row);

    if (item === null) {
        return;
    }

    row.scrollLeft = item.offsetLeft - row.offsetWidth * 0.5 + item.offsetWidth * 0.5;
};
