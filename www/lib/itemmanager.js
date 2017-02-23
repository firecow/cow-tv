/**
 * @constructor
 */
var ItemManager = function() {
    /**
     * @type {HTMLDivElement}
     */
    this.liveElement = document.getElementById('live');
};

/**
 * @param {function()=} opt_callback
 */
ItemManager.prototype.prepareLiveTVItems = function(opt_callback) {
    var url = 'http://www.dr.dk/mu/bundle?BundleType=%22Channel%22&DrChannel=true&ChannelType=TV&WebChannel=false&ApprovedByEditor=true',
        callback = opt_callback || function() {};
    JsonGetRequest.prepare(url, function(err, request) {
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

            item.appendChild(img);
            item.appendChild(title);

            this.liveElement.appendChild(item);
        }.bind(this));
        callback();
    }.bind(this));
};
