/**
 * @constructor
 */
ScrollingControl = function() {
    var mediaPlayer = document.getElementById('media-player'),
        liveStrip = document.getElementById('live-strip'),
        dx;

    /**
     * @type {Event}
     */
    this.prevMouseDown = null;

    /**
     * @type {Event}
     */
    this.prevTouch = null;

    /**
     * @type {number}
     */
    this.totalDx = 0;

    // Mouse wheel.
    liveStrip.addEventListener('wheel', function(e) {
        liveStrip.scrollLeft += e.deltaX / Resizer.getScale();
    }.bind(this));

    // Mouse handling.
    mediaPlayer.addEventListener('mouseup', function() {
        app.videoPlayer.stop();
    }.bind(this));
    liveStrip.addEventListener('mousedown', function(e) {
        if (e.button === 0) {
            this.prevMouseDown = e;
        }
        e.preventDefault();
    }.bind(this));
    window.addEventListener('mousemove', function(e) {
        if (this.prevMouseDown !== null) {
            dx = e.clientX - this.prevMouseDown.clientX;
            this.totalDx += Math.abs(dx);
            liveStrip.scrollLeft += dx / Resizer.getScale();
            this.prevMouseDown = e;
        }
        e.preventDefault();
    }.bind(this));

    window.addEventListener('mouseup', function(e) {
        this.prevMouseDown = null;
        this.totalDx = 0;
        e.preventDefault();
    }.bind(this));

    // Touch handling
    mediaPlayer.addEventListener('touchend', function() {
        app.videoPlayer.stop();
    }.bind(this));
    liveStrip.addEventListener('touchstart', function(e) {
        if (this.prevTouch === null) {
            this.prevTouch = e.changedTouches.item(0);
        }
        e.preventDefault();
    }.bind(this));

    window.addEventListener('touchmove', function(e) {
        var newTouch = e.changedTouches.item(0),
            dx;
        if (this.prevTouch.identifier === newTouch.identifier) {
            dx = this.prevTouch.clientX - newTouch.clientX;
            this.totalDx += Math.abs(dx);
            liveStrip.scrollLeft += dx * 1 / Resizer.getScale();
            this.prevTouch = newTouch;
        }
    }.bind(this));
    window.addEventListener('touchend', function(e) {
        if (this.prevTouch && e.changedTouches.item(0).identifier === this.prevTouch.identifier) {
            this.prevTouch = null;
            this.totalDx = 0;
        }
        e.preventDefault();
    }.bind(this));
};
