/**
 * @constructor
 */
var MouseNavigation = function() {

    /**
     * @type {HTMLElement}
     */
    this.liveStrip = document.getElementById('live-strip');

    /**
     * @type {?HTMLElement}
     */
    this.downedItem = null;

    /**
     * @type {{x:number, y: number}}
     */
    this.mouseDown = null;

    this.liveStrip.addEventListener('wheel', function(e) {
        this.liveStrip.scrollLeft += e.deltaX;
    }.bind(this));

    this.liveStrip.addEventListener('mousedown', function(e) {
        if (e.button === 0) {
            this.mouseDown = {x: e.offsetX, y: e.offsetY};
        }
        e.preventDefault();
    }.bind(this));

    window.addEventListener('mousemove', function(e) {
        if (this.mouseDown !== null) {
            this.liveStrip.scrollLeft += e.movementX * 1 / Resizer.getScale();
        }

        this.downedItem = null;
        e.preventDefault();
    }.bind(this));
    window.addEventListener('mouseup', function(e) {
        this.downedItem = null;
        this.mouseDown = null;
        e.preventDefault();
    }.bind(this));
};

/**
 * @param {HTMLElement} item
 * @param {MouseEvent} e
 */
MouseNavigation.prototype.mouseDownItem = function(item, e) {
    this.downedItem = item;
};

/**
 * @param {HTMLElement} item
 * @param {MouseEvent} e
 */
MouseNavigation.prototype.mouseUpItem = function(item, e) {
    if (this.downedItem !== null) {
        console.log(this.downedItem.dataset.videoUrl);
    }
};