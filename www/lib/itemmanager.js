/**
 * @constructor
 */
ItemManager = function() {

};

/**
 * @param {function()=} opt_callback
 */
ItemManager.prototype.prepareLiveStrip = function(opt_callback) {
    var url = 'https://www.dr.dk/mu-online/api/1.4/channel/all-active-dr-tv-channels',
        callback = opt_callback || function() {},
        liveStrip = document.getElementById('live-strip'),
        request = new JsonGetRequest(url);

    request.prepare(function(err, request) {
        var data;
        if (err) {
            throw err;
        }

        data = request.getData();
        data = data.filter(function(e) {
            return e['WebChannel'] === false;
        });
        data.sort(function(a, b) {
            var aTitle = a['Title'].toUpperCase().replace(/\s+/g, ''),
                bTitle = b['Title'].toUpperCase().replace(/\s+/g, '');
            if (aTitle === bTitle) {
                return 0;
            }
            return aTitle > bTitle;
        });

        for (var i = 0; i < data.length; i++) {
            var itemData = data[i];
            liveStrip.appendChild(this.createChannelItem(itemData));
        }

        callback();
    }.bind(this));
};

/**
 * @param {function()=} opt_callback
 */
ItemManager.prototype.prepareMostViewed = function(opt_callback) {
    var url = 'https://www.dr.dk/mu-online/api/1.4/list/view/mostviewed?channeltype=TV',
        callback = opt_callback || function() {},
        mostviewedStrip = document.getElementById('mostviewed-strip'),
        request = new JsonGetRequest(url);

    request.prepare(function(err, request) {
        var data;
        if (err) {
            throw err;
        }

        data = request.getData();
        for (var i = 0; i < data['Items'].length; i++) {
            var itemData = data['Items'][i];
            mostviewedStrip.appendChild(this.createProgramCardItem(itemData));
        }

        callback();
    }.bind(this));
};

/**
 * @param {*} itemData
 * @return {Element}
 */
ItemManager.prototype.createChannelItem = function(itemData) {
    var item = document.createElement('div');
    var img = document.createElement('img');
    var title = document.createElement('div');
    var subTitle = document.createElement('div');
    var type = itemData['Type'];

    item.classList.add('item');
    item.dataset.type = type;
    item.dataset.videoUrl = this.getStreamingUrl(itemData);

    img.classList.add('img');
    img.draggable = false;
    img.src = itemData['PrimaryImageUri'];

    title.classList.add('title');
    title.innerText = itemData['Title'];

    subTitle.classList.add('title');
    subTitle.innerText = "\n";

    item.addEventListener('click', function() {
        app.eventHandler.onChannelClick(item);
    }, false);

    item.appendChild(title);
    item.appendChild(img);
    item.appendChild(subTitle);
    return item;
};

/**
 * @param {*} itemData
 * @return {Element}
 */
ItemManager.prototype.createProgramCardItem = function(itemData) {
    var item = document.createElement('div');
    var img = document.createElement('img');
    var title = document.createElement('div');
    var subTitle = document.createElement('div');
    var type = itemData['Type'];

    item.classList.add('item');
    item.dataset.type = type;

    item.dataset.videoResource = itemData["PrimaryAsset"]["Uri"];

    img.classList.add('img');
    img.draggable = false;
    img.src = itemData['PrimaryImageUri'];

    title.classList.add('title');
    title.innerText = itemData['Title'];

    subTitle.classList.add('title');
    subTitle.innerText = "\n";

    item.addEventListener('click', function() {
        app.eventHandler.onProgramCardClick(item);
    }, false);

    item.appendChild(title);
    item.appendChild(img);
    item.appendChild(subTitle);
    return item;
};

/**
 * @param {*} itemData
 * @return {?string}
 */
ItemManager.prototype.getStreamingUrl = function(itemData) {
    if (!itemData['StreamingServers']) {
        return null;
    }

    var streamingServer = itemData['StreamingServers'].find(function(s) {
        return s['LinkType'] === 'HLS';
    });
    var quality = streamingServer['Qualities'].sort(function(a, b) {
        return b['Kbps'] - a['Kbps'];
    })[0];
    var streams = quality['Streams'][0];

    return streamingServer['Server'] + '/' + streams['Stream'];
};
