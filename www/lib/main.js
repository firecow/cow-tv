var windowLoaded = function() {
    window.app = {
        device: new Device(),
        videoPlayer: new VideoPlayer(),
        dPadNavigation: new DPadNavigation(),
        eventHandler: new EventHandler(),
        mouseDragScroll: new MouseDragScroll(),
        itemManager: new ItemManager(),
        stateHandler: new StateHandler(),
        animator: new Animator()
    };

    app.itemManager.prepareLiveStrip();
    app.itemManager.prepareMostViewed();
    app.stateHandler.init();

    var debugInfo = document.getElementById("debug-info");
    debugInfo.innerText = window.devicePixelRatio + "dpr " + document.body.offsetWidth + "x" + document.body.offsetHeight;
    window.addEventListener('resize', function() {
        debugInfo.innerText = window.devicePixelRatio + "dpr " + document.body.offsetWidth + "x" + document.body.offsetHeight;
    });
    setTimeout(function() {
        debugInfo.classList.add('hidden');
    }, 5000);
};

window.addEventListener('load', windowLoaded);

