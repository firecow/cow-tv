var windowLoaded = function() {
    var videoPlayer = new VideoPlayer(),
        dpadNavigation = new DPadNavigation(videoPlayer),
        mouseNavigation = new MouseNavigation(),
        resize = new Resizer(dpadNavigation),
        itemManager = new ItemManager(dpadNavigation, mouseNavigation);

    itemManager.prepareLiveTVItems();
    resize.onResize();
};

window.addEventListener('load', windowLoaded);

