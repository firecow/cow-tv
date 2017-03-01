/**
 * @constructor
 * @param {DPadNavigation} dPadNavigation
 * @param {MouseNavigation} mouseNavigation
 */
var ItemManager = function(dPadNavigation, mouseNavigation) {

    /**
     * @type {DPadNavigation}
     */
    this.dPadNavigation = dPadNavigation;

    /**
     * @type {MouseNavigation}
     */
    this.mouseNavigation = mouseNavigation;

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

        itemDatas.forEach(function(itemData) {
            var item = document.createElement('div'),
                img = document.createElement('img'),
                title = document.createElement('div'),
                streams, streamingServer ,quality;

            item.classList.add('item');
            img.classList.add('img');
            title.classList.add('title', 'text', 'font-size-small');

            streamingServer = itemData['StreamingServers'][1];
            quality = streamingServer['Qualities'][0];
            streams = quality['Streams'][0];

            item.dataset.videoUrl = streamingServer['Server'] + '/' + streams['Stream'];

            img.src = itemData['Assets'][0]['Uri'];

            title.innerText = itemData['Title'];

            item.addEventListener('mousedown', function(e) {
                this.mouseNavigation.mouseDownItem(item, e);
                e.preventDefault();
            }.bind(this));
            item.addEventListener('mouseup', function(e) {
                this.mouseNavigation.mouseUpItem(item, e);
                e.preventDefault();
            }.bind(this));

            item.appendChild(img);
            item.appendChild(title);

            this.liveChildren.appendChild(item);
        }.bind(this));
        callback();
    }.bind(this));
};
