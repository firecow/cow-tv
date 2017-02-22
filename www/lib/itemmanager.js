/**
 * @constructor
 */
var ItemManager = function() {
    /**
     * @type {HTMLDivElement}
     */
    this.itemsElement = document.getElementById('items');
};


ItemManager.prototype.showLiveTVItems = function() {
    var url = 'http://www.dr.dk/mu/bundle?BundleType=%22Channel%22&DrChannel=true&ChannelType=TV&WebChannel=false&ApprovedByEditor=true';
    JsonGetRequest.prepare(url, this.initLiveTVItems.bind(this));
};


/**
 * @param {?Error} err
 * @param {JsonGetRequest} request
 */
ItemManager.prototype.initLiveTVItems = function(err, request) {
    var itemDatas;

    if (err) {
        throw err;
    }

    itemDatas = request.getData()['Data'];

    itemDatas.forEach(function(itemData) {
        var item = document.createElement('div'),
            img = document.createElement('img'),
            title = document.createElement('div');

        item.classList.add('item');
        img.classList.add('itemimg');
        title.classList.add('itemtitle');

        img.src = itemData['Assets'][0]['Uri'];

        title.innerText = itemData['Title'];

        console.log(itemData);

        item.appendChild(img);
        item.appendChild(title);

        this.itemsElement.appendChild(item);
    }.bind(this));
};