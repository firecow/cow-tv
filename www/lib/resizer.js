/**
 * @constructor
 * @param {DPadNavigation} dPadNavigation
 */
Resizer = function(dPadNavigation) {

    this.dPadNavigation = dPadNavigation;

    /**
     * @type {HTMLElement}
     */
    this.scaler = document.getElementById('scaler');

    /**
     * @type {number}
     */
    this.source = 2160;

    window.addEventListener('resize', this.onResize.bind(this));
};

/**
 * Window have been resized
 */
Resizer.prototype.onResize = function() {
    var scaler = this.scaler,
        minScreenDimension = Math.min(this.getScreenWidth(), this.getScreenHeight()),
        scale;

    scale = minScreenDimension / this.source;

    scaler.style.width = 1 / scale * this.getScreenWidth() + 'px';
    scaler.style.height = 1 / scale * this.getScreenHeight() + 'px';
    scaler.style.transform = 'scale(' + scale + ', ' + scale + ')';


    this.dPadNavigation.layoutStrip();
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
