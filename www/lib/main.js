var windowLoaded = function() {
    var resize = new Resizer(),
        itemManager = new ItemManager(),
        dpadNavigation = new DPadNavigation();

    itemManager.prepareLiveTVItems(function() {
        dpadNavigation.selectElement(document.getElementsByClassName('item')[0])
    }.bind(this));
    resize.onResize();
};

window.addEventListener('load', windowLoaded);

