var windowLoaded = function() {
    var videoPlayer = new VideoPlayer(),
        dpadNavigation = new DPadNavigation(videoPlayer),
        mouseNavigation = new MouseNavigation(),
        touchNavigation = new TouchNavigation(),
        resize = new Resizer(dpadNavigation),
        itemManager = new ItemManager(dpadNavigation, mouseNavigation, touchNavigation);

    itemManager.prepareLiveTVItems();
    resize.onResize();
};

window.addEventListener('load', windowLoaded);

