var windowLoaded = function() {
    window.app = {
        device: new Device(),
        selectionHandler: new SelectionHandler(),
        keyPressHandler: new KeypressHandler(),
        eventHandler: new EventHandler(),
        mouseDragScroll: new MouseDragScroll(),
        itemManager: new ItemManager(),
        stateHandler: new StateHandler(),
        animator: new Animator(),
        // debugInfo: new DebugInfo(),
        // fpsCounter: new FpsCounter()
    };

    var videoChannel = document.getElementById('video-channel');
    videoChannel.player = new VideoPlayer(videoChannel);

    var videoProgram = document.getElementById('video-program');
    videoProgram.player = new VideoPlayer(videoProgram);

    app.itemManager.prepareLiveStrip();
    // app.itemManager.prepareMostViewed();
    app.keyPressHandler.init();
    app.stateHandler.init();
    // app.debugInfo.updateDebugText();
};

window.addEventListener('load', windowLoaded);

