var windowLoaded = function() {
    var videoPlayer = new VideoPlayer(),
        dpadNavigation = new DPadNavigation(videoPlayer),
        resize = new Resizer(dpadNavigation),
        itemManager = new ItemManager(dpadNavigation);

    itemManager.prepareLiveTVItems();
    resize.onResize();
};

window.addEventListener('load', windowLoaded);

