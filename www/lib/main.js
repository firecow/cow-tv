var windowLoaded = function() {
    window.app = {
        device: new Device(),
        videoPlayer: new VideoPlayer(),
        dPadNavigation: new DPadNavigation(),
        eventHandler: new EventHandler(),
        mouseDragScroll: new MouseDragScroll(),
        itemManager: new ItemManager(),
        stateHandler: new StateHandler(),
        animator: new Animator(),
        styleSheetManipulator: new StyleSheetManipulator(),
        debugInfo: new DebugInfo()
    };

    app.styleSheetManipulator.setMinResolutionRules(document.body.offsetWidth, document.body.offsetHeight);
    app.itemManager.prepareLiveStrip();
    app.itemManager.prepareMostViewed();
    app.stateHandler.init();
    app.debugInfo.updateDebugText();
};

window.addEventListener('load', windowLoaded);

