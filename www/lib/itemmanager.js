/**
 * @constructor
 */
ItemManager = function() {

};

/**
 * @param {function()=} opt_callback
 */
ItemManager.prototype.prepareLiveTVItems = function(opt_callback) {
    var url = 'http://www.dr.dk/mu/bundle?BundleType=%22Channel%22&DrChannel=true&ChannelType=TV&WebChannel=false&ApprovedByEditor=true',
        callback = opt_callback || function() {},
        liveChildren = document.getElementById('live-children');

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
                app.mouseNavigation.mouseDownItem(item, e);
                e.preventDefault();
            }.bind(this));
            item.addEventListener('mouseup', function(e) {
                app.mouseNavigation.mouseUpItem(item, e);
                e.preventDefault();
            }.bind(this));
            item.addEventListener('touchstart', function(e) {
                app.touchNavigation.touchStartItem(item, e);
                e.preventDefault();
            }.bind(this));
            item.addEventListener('touchend', function(e) {
                app.touchNavigation.touchEndItem(item, e);
                e.preventDefault();
            }.bind(this));

            item.appendChild(img);
            item.appendChild(title);

            liveChildren.appendChild(item);
        }.bind(this));
        callback();
    }.bind(this));
};
