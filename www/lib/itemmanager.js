/**
 * @constructor
 * @param {DPadNavigation} dPadNavigation
 */
var ItemManager = function(dPadNavigation) {

    /**
     * @type {DPadNavigation}
     */
    this.dPadNavigation = dPadNavigation;

    /**
     * @type {HTMLDivElement}
     */
    this.liveChildren = document.getElementById('live-children');
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

        itemDatas.forEach(function(itemData, index) {
            var item = document.createElement('div'),
                img = document.createElement('img'),
                title = document.createElement('div');

            if (index === 0) {
                this.dPadNavigation.selectItem(item);
            }

            item.classList.add('item');
            img.classList.add('img');
            title.classList.add('title', 'text', 'font-size-small');

            img.src = itemData['Assets'][0]['Uri'];

            title.innerText = itemData['Title'];

            item.appendChild(img);
            item.appendChild(title);

            this.liveChildren.appendChild(item);
        }.bind(this));
        callback();
    }.bind(this));
};
