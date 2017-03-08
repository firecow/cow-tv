var windowLoaded = function() {
    window.app = {
        videoPlayer: new VideoPlayer(),
        dPadNavigation: new DPadNavigation(),
        mouseNavigation: new MouseNavigation(),
        touchNavigation: new TouchNavigation(),
        fullscreenApi: new FullscreenApi(),
        resizer: new Resizer(),
        itemManager: new ItemManager()

    };

    app.itemManager.prepareLiveTVItems();
    app.resizer.onResize();
};

window.addEventListener('load', windowLoaded);

