var windowLoaded = function() {
    window.app = {
        device: new Device(),
        videoPlayer: new VideoPlayer(),
        dPadNavigation: new DPadNavigation(),
        eventHandler: new EventHandler(),
        mouseDragScroll: new MouseDragScroll(),
        itemManager: new ItemManager(),
        channelManager: new ChannelManager(),
        stateHandler: new StateHandler(),
        animator: new Animator(),
        styleSheetManipulator: new StyleSheetManipulator(),
        debugInfo: new DebugInfo()
    };

    // app.itemManager.prepareLiveStrip();
    app.channelManager.initChannels();
    app.styleSheetManipulator.setMinResolutionRules(document.body.offsetWidth, document.body.offsetHeight);
    app.itemManager.prepareMostViewed();
    app.stateHandler.init();
    app.debugInfo.updateDebugText();
};

window.addEventListener('load', windowLoaded);

