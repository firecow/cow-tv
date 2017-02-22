/**
 * @constructor
 */
Resizer = function() {

    /**
     * @type {Wrapper}
     */
    this.content = new Wrapper(document.getElementById('content'));

    window.addEventListener('resize', this.onResize.bind(this));
};

/**
 * Window have been resized
 */
Resizer.prototype.onResize = function() {
    var content = this.content,
        contentAspect = content.getAspect(),
        contentWidth = content.getWidth(),
        contentHeight = content.getHeight(),
        screenAspect = this.getScreenAspect(),
        screenWidth = this.getScreenWidth(),
        screenHeight = this.getScreenHeight(),
        ratio;

    if (screenAspect < contentAspect) {
        ratio = screenWidth / contentWidth;
    } else {
        ratio = screenHeight / contentHeight;
    }
    this.content.setScale(ratio, ratio);
    this.content.setPosition((screenWidth - ratio * contentWidth) * 0.5, (screenHeight - ratio * contentHeight) * 0.5);
};

/**
 * @returns {number}
 */
Resizer.prototype.getScreenAspect = function() {
    return this.getScreenWidth() / this.getScreenHeight();
};

/**
 * @returns {number}
 */
Resizer.prototype.getScreenWidth = function() {
    return window.innerWidth;
};

/**
 * @returns {number}
 */
Resizer.prototype.getScreenHeight = function() {
    return window.innerHeight;
};