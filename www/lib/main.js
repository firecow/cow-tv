var windowLoaded = function() {
    window.app = {
        device: new Device(),
        videoPlayer: new VideoPlayer(),
        dPadNavigation: new DPadNavigation(),
        fullscreenApi: new FullscreenApi(),
        eventHandler: new EventHandler(),
        mouseDragScroll: new MouseDragScroll(),
        resizer: new Resizer(),
        itemManager: new ItemManager(),
        channelManager: new ChannelManager(),
        stateHandler: new StateHandler(),
        animator: new Animator()
    };

    // app.itemManager.prepareLiveStrip();
    app.channelManager.initChannels();
    app.itemManager.prepareMostViewed();
    app.fullscreenApi.init();
    app.stateHandler.init();
    app.resizer.onResize();
};

window.addEventListener('load', windowLoaded);

