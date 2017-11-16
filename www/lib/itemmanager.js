/**
 * @constructor
 */
ItemManager = function() {

};

/**
 * @param {function()=} opt_callback
 */
ItemManager.prototype.prepareLiveTVItems = function(opt_callback) {
    var url = 'https://www.dr.dk/mu/bundle?BundleType=%22Channel%22&DrChannel=true&ChannelType=TV&WebChannel=false',
        callback = opt_callback || function() {},
        liveStrip = document.getElementById('live-strip'),
        newsStrip = document.getElementById('news-strip'),
        favoriteStrip = document.getElementById('favorite-strip'),
        popularStrip = document.getElementById('popular-strip');

    JsonGetRequest.prepare(url, function(err, request) {
        var itemDatas;

        if (err) {
            throw err;
        }

        itemDatas = request.getData()['Data'];

        itemDatas.sort(function(a, b) {
            var aTitle = a['Title'].toUpperCase().replace(/\s+/g, ''),
                bTitle = b['Title'].toUpperCase().replace(/\s+/g, '');
            if (aTitle === bTitle) {
                return 0;
            }
            return aTitle > bTitle;
        });

        itemDatas.forEach(function(itemData) {
            var streamingServers = itemData['StreamingServers'];
            if (!streamingServers || streamingServers.length == 0) {
                return;
            }

            var item = document.createElement('div');
            var img = document.createElement('img');
            var title = document.createElement('div');

            item.classList.add('item');
            img.classList.add('img');
            title.classList.add('title', 'text', 'font-size-small');
            img.draggable = false;

            var streamingServer = itemData['StreamingServers'][1];
            var quality = streamingServer['Qualities'][0];
            var streams = quality['Streams'][0];

            item.dataset.videoUrl = streamingServer['Server'] + '/' + streams['Stream'];

            var assets = itemData['Assets'];
            var asset = assets.find(function(a) {
                return a['Name'].indexOf("PAUSEBILLEDE") === -1;
            });
            asset = asset || assets[0];

            img.src = asset['Uri'];

            title.innerText = itemData['Title'];

            item.addEventListener('click', function() {
                app.clickHandler.onItemClick(item);
            }, false);

            item.appendChild(img);
            item.appendChild(title);

            liveStrip.appendChild(item);
        }.bind(this));
        callback();
    }.bind(this));
};
