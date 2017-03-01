/**
 * @constructor
 * @param {DPadNavigation} dPadNavigation
 */
Resizer = function(dPadNavigation) {

    /**
     * @type {DPadNavigation}
     */
    this.dPadNavigation = dPadNavigation;

    /**
     * @type {HTMLElement}
     */
    this.scaler = document.getElementById('scaler');

    window.addEventListener('resize', this.onResize.bind(this));
};

/**
 * Window have been resized
 */
Resizer.prototype.onResize = function() {
    var scaler = this.scaler,
        scale = Resizer.getScale();

    scaler.style.width = 1 / scale * Resizer.getScreenWidth() + 'px';
    scaler.style.height = 1 / scale * Resizer.getScreenHeight() + 'px';
    scaler.style.transform = 'scale(' + scale + ', ' + scale + ')';


    this.dPadNavigation.layoutStrip();
};


Resizer.source = 2160;

/**
 * @return {number}
 */
Resizer.getScale = function() {
    var minScreenDimension = Math.min(Resizer.getScreenWidth(), Resizer.getScreenHeight());
    return minScreenDimension / Resizer.source;
};

/**
 * @returns {number}
 */
Resizer.getScreenWidth = function() {
    return window.innerWidth;
};

/**
 * @returns {number}
 */
Resizer.getScreenHeight = function() {
    return window.innerHeight;
};
