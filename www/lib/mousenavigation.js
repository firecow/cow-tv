/**
 * @constructor
 */
MouseNavigation = function() {
    var mediaPlayer = document.getElementById('media-player'),
        liveStrip = document.getElementById('live-strip');

    /**
     * @type {?HTMLElement}
     */
    this.downedItem = null;

    /**
     * @type {{x:number, y: number}}
     */
    this.mouseDown = null;

    mediaPlayer.addEventListener('mouseup', function() {
        app.videoPlayer.stop();
    }.bind(this));

    liveStrip.addEventListener('wheel', function(e) {
        liveStrip.scrollLeft += e.deltaX * 1 / Resizer.getScale();
    }.bind(this));

    liveStrip.addEventListener('mousedown', function(e) {
        if (e.button === 0) {
            this.mouseDown = {x: e.offsetX, y: e.offsetY};
        }
        e.preventDefault();
    }.bind(this));

    window.addEventListener('mousemove', function(e) {
        if (this.mouseDown !== null) {
            liveStrip.scrollLeft += e.movementX * 1 / Resizer.getScale();
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
        app.videoPlayer.play(this.downedItem.dataset.videoUrl);
    }
};