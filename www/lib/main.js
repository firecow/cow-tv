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
};

window.addEventListener('load', windowLoaded);

