ChannelManager = function () {
	
};

ChannelManager.prototype.channels = [];

ChannelManager.prototype.initChannels = function() {
    this.fetchChannels(function() {
        this.prepareLiveChannelsStrip();
    }.bind(this));

};

ChannelManager.prototype.fetchChannels = function (opt_callback) {
    var url = 'https://www.dr.dk/mu-online/api/1.4/channel/all-active-dr-tv-channels',
        callback = opt_callback || function() {},
        // liveStrip = document.getElementById('live-strip'),
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
            this.channels.push(new Channel(
                itemData['Slug'],
                itemData['Title'],
                itemData['PrimaryImageUri'],
                this.getStreamingUrl(itemData)
            ));
        }

        callback();
    }.bind(this));


};

ChannelManager.prototype.prepareLiveChannelsStrip = function () {

    var liveStrip = document.getElementById('live-strip');

    this.channels.forEach(function(channel) {

        var tile = new Tile(channel.logoUrl, channel.title, channel.streamingServer, Tile.type.LIVE_CHANNEL);

        liveStrip.appendChild(tile.createDOMElement());

    });


};


/**
 * @param {*} itemData
 * @return {?string}
 */
ChannelManager.prototype.getStreamingUrl = function(itemData) {
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