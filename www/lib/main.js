var windowLoaded = function() {
    window.app = {
        device: new Device(),
        selectionHandler: new SelectionHandler(),
        dPadNavigation: new DPadNavigation(),
        eventHandler: new EventHandler(),
        mouseDragScroll: new MouseDragScroll(),
        itemManager: new ItemManager(),
        stateHandler: new StateHandler(),
        animator: new Animator(),
        styleSheetManipulator: new StyleSheetManipulator(),
        debugInfo: new DebugInfo()
    };

    var videoChannel = document.getElementById('video-channel');
    videoChannel.player = new VideoPlayer(videoChannel);

    var videoProgram = document.getElementById('video-program');
    videoProgram.player = new VideoPlayer(videoProgram);

    app.styleSheetManipulator.setMinResolutionRules(document.body.offsetWidth, document.body.offsetHeight);
    app.itemManager.prepareLiveStrip();
    app.itemManager.prepareMostViewed();
    app.dPadNavigation.init();
    app.stateHandler.init();
    app.debugInfo.updateDebugText();
};

window.addEventListener('load', windowLoaded);

