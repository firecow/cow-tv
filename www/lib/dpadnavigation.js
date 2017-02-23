/**
 * @constructor
 */
var DPadNavigation = function() {
    /**
     * @type {string}
     */
    this.selectedClassName = 'selected';

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
            // e.preventDefault();
        }
    }.bind(this));
    window.addEventListener('keyup', function(e) {
        var keyCode = e.keyCode;
        if (this.keyUpCodeMap[keyCode]) {
            this.keyUpCodeMap[keyCode]();
            // e.preventDefault();
        }
    }.bind(this));
};

/**
 * @return {HTMLElement}
 */
DPadNavigation.prototype.getSelectedElement = function() {
    var selectedElements = document.getElementsByClassName(this.selectedClassName);
    if (selectedElements.length === 1) {
        return selectedElements[0];
    } else if (selectedElements.length > 1) {
        // Fail safe, is something went wrong.
        selectedElements.forEach(function(selectedElement) {
            selectedElement.classList.remove(this.selectedClassName);
        }.bind(this));
        selectedElements[0].classList.add(this.selectedClassName);
        return selectedElements[0];
    }
    return null;
};


/**
 * @return {number}
 */
DPadNavigation.prototype.getElementIndex = function(element) {
    var i = 0;
    while( (element = element.previousSibling) != null ) {
        i++;
    }
    return i;
};

/**
 * @param {HTMLElement} element
 */
DPadNavigation.prototype.selectElement = function(element) {
    var selectedElement = this.getSelectedElement();
    if (selectedElement) {
        selectedElement.classList.remove(this.selectedClassName);
    }
    element.classList.add(this.selectedClassName);
};

/**
 * Move left pressed.
 */
DPadNavigation.prototype.moveLeft = function() {
    var selectedElement = this.getSelectedElement();
    if (selectedElement.previousSibling) {
        this.selectElement(selectedElement.previousSibling);
    }
};

/**
 * Move right pressed.
 */
DPadNavigation.prototype.moveRight = function() {
    var selectedElement = this.getSelectedElement();
    if (selectedElement.nextSibling) {
        this.selectElement(selectedElement.nextSibling);
    }
};

/**
 * Move up pressed.
 */
DPadNavigation.prototype.moveUp = function() {

};

/**
 * Move down pressed.
 */
DPadNavigation.prototype.moveDown = function() {

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