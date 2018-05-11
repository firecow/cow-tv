/**
 * @constructor
 */
FpsCounter = function() {

    var fpsCounterElem = document.getElementById("fps-counter");
    var lastTime = 0;
    var deltas = [];
    var tick = function(e) {
        deltas.push(e - lastTime);
        lastTime = e;

        if (deltas.length > 100) {
            var avg = 0;
            for (var i = 0; i < deltas.length; i++) {
                avg += deltas[i];
            }

            avg = 1000 / (avg / deltas.length);

            fpsCounterElem.innerText = avg.toFixed(1) + "";
            deltas = [];
        }


        requestAnimationFrame(tick);
    };
    tick(performance.timeOrigin);
};