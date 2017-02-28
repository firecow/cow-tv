var windowLoaded = function() {
    var dpadNavigation = new DPadNavigation(),
        resize = new Resizer(dpadNavigation),
        itemManager = new ItemManager(dpadNavigation);

    itemManager.prepareLiveTVItems();
    resize.onResize();
};

window.addEventListener('load', windowLoaded);

