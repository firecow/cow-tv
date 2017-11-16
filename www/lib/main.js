var windowLoaded = function() {
    window.app = {
        videoPlayer: new VideoPlayer(),
        dPadNavigation: new DPadNavigation(),
        fullscreenApi: new FullscreenApi(),
        clickHandler: new ClickHandler(),
        resizer: new Resizer(),
        itemManager: new ItemManager()
    };

    app.itemManager.prepareLiveTVItems();
    app.resizer.onResize();
};

window.addEventListener('load', windowLoaded);

