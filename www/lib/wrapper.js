/**
 * @constructor
 * @param {HTMLElement} element
 */
var Wrapper = function(element) {

    /**
     * @type {HTMLElement}
     */
    this.element = element;
    this.element.style.transformOrigin = '0px 0px 0px';

    this.scale = {x: 0, y: 0};
    this.position = {x: 0, y: 0};
};

/**
 * @param {number} x
 * @param {number} y
 */
Wrapper.prototype.setPosition = function(x, y) {
    this.position.x = x;
    this.position.y = y;
    this.updateTransform();
};

/**
 * @param {number} x
 * @param {number} y
 */
Wrapper.prototype.setScale = function(x, y) {
    this.scale.x = x;
    this.scale.y = y;
    this.updateTransform();
};

/**
 * Updates the transform style.
 */
Wrapper.prototype.updateTransform = function() {
    var p = this.position,
        s = this.scale;
    this.element.style.transform = 'translate(' + p.x + 'px, ' + p.y + 'px) scale(' + s.x + ', ' + s.y + ')';
};


/**
 * @returns {number}
 */
Wrapper.prototype.getAspect = function() {
    return this.getWidth() / this.getHeight();
};

/**
 * @returns {number}
 */
Wrapper.prototype.getWidth = function() {
    return this.element.offsetWidth;
};

/**
 * @returns {number}
 */
Wrapper.prototype.getHeight = function() {
    return this.element.offsetHeight;
};