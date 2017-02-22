var windowLoaded = function() {
    var resize = new Resizer(),
        itemManager = new ItemManager();

    itemManager.showLiveTVItems();
    resize.onResize();
};

window.addEventListener('load', windowLoaded);

