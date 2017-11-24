/**
 * @constructor
 */
DebugInfo = function() {
    this.debugInfo = document.getElementById("debug-info");

    window.addEventListener('resize', function() {
        this.updateDebugText();
    }.bind(this));

    // Hide after 5s.
    setTimeout(function() {
        this.debugInfo.classList.add('hidden');
    }.bind(this), 5000);
};

/**
 * Updates debug text with specific values.
 */
DebugInfo.prototype.updateDebugText = function() {
    var pixelRatio = window.devicePixelRatio;
    var width = document.body.offsetWidth;
    var height = document.body.offsetHeight;
    this.debugInfo.innerText = pixelRatio + "dpr " + width + "x" + height + " " + navigator.userAgent;
};

