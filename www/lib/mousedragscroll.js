/**
 * @constructor
 */
MouseDragScroll = function() {

    /**
     * @type {?{event: Event, elem: Element}}
     */
    this.mouseDown = null;

    window.addEventListener('mousemove', function(e) {
        var dx;
        if (this.mouseDown !== null) {
            dx = e.clientX - this.mouseDown.event.clientX;
            this.mouseDown.elem.scrollLeft -= dx;
            this.mouseDown.event = e;
        }
    }.bind(this));

    window.addEventListener('mouseup', function(e) {
        this.mouseDown = null;
    }.bind(this));

    var elements = Array.from(document.getElementsByClassName("mousedragscroll"));
    elements.forEach(function(elem) {
        this.initDragScrollOnElement(elem);
    }, this);
};

/**
 * @param {Element} elem
 */
MouseDragScroll.prototype.initDragScrollOnElement = function(elem) {
    elem.addEventListener('mousedown', function(e) {
        if (e.button === 0 && !this.mouseDown) {
            this.mouseDown = {
                event: e,
                elem: elem
            };
        }
    }.bind(this));

};