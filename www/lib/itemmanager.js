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
        var itemDatas;
        if (err) {
            throw err;
        }

        itemDatas = request.getData();
        itemDatas = itemDatas.filter(function(itemData) {
            return itemData['WebChannel'] === false;
        });
        itemDatas.sort(function(a, b) {
            var aTitle = a['Title'].toUpperCase().replace(/\s+/g, ''),
                bTitle = b['Title'].toUpperCase().replace(/\s+/g, '');
            if (aTitle === bTitle) {
                return 0;
            }
            return aTitle > bTitle;
        });

        for (var i = 0; i < itemDatas.length; i++) {
            var itemData = itemDatas[i];
            liveStrip.appendChild(this.createItem(itemData));
        }

        callback();
    }.bind(this));
};

/**
 * @param {*} itemData
 * @return {Element}
 */
ItemManager.prototype.createItem = function(itemData) {
    var item = document.createElement('div');
    var img = document.createElement('img');
    var title = document.createElement('div');

    item.classList.add('item');
    item.dataset.videoUrl = this.getStreamingUrl(itemData);

    img.classList.add('img');
    img.draggable = false;
    img.src = itemData['PrimaryImageUri'];

    title.classList.add('title', 'text', 'font-size-small');
    title.innerText = itemData['Title'];

    item.addEventListener('click', function() {
        app.clickHandler.onItemClick(item);
    }, false);

    item.appendChild(img);
    item.appendChild(title);
    return item;
};

/**
 * @param {*} itemData
 * @return {string}
 */
ItemManager.prototype.getAssetUrl = function(itemData) {
    var assets = itemData['Assets'];
    var asset = assets.find(function(a) {
        return a['Name'].indexOf("PAUSEBILLEDE") === -1;
    });
    return asset || assets[0];
};

/**
 * @param {*} itemData
 * @return {string}
 */
ItemManager.prototype.getStreamingUrl = function(itemData) {
    var streamingServer = itemData['StreamingServers'].find(function(s) {
        return s['LinkType'] === 'HLS';
    });
    var quality = streamingServer['Qualities'].sort(function(a, b) {
        return b['Kbps'] - a['Kbps'];
    })[0];
    var streams = quality['Streams'][0];

    return streamingServer['Server'] + '/' + streams['Stream'];
};

var asset = {
    "Kind": "Image",
    "Uri": "https://www.dr.dk/mu/bar/5a0454bda11f9f0e5c734e7e",
    "StartPublish": "2017-11-09T13:14:31Z",
    "EndPublish": "9999-12-31T22:59:59Z",
    "ContentType": "image/jpeg",
    "Id": "j9shwa02",
    "Name": "DR3_PAUSEBILLEDE.jpg",
    "Size": 178806,
    "Trashed": false
};
