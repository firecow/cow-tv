ChannelManager = function () {
	
};

ChannelManager.prototype.channels = [];
ChannelManager.prototype.currentChannel = null;

ChannelManager.prototype.initChannels = function() {
    this.fetchChannels(function() {

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

        var liveStrip = document.getElementById('live-strip');
        for (var i = 0; i < data.length; i++) {
            var itemData = data[i];
            var tile = new Tile(itemData['PrimaryImageUri'], itemData['Title'], this.getStreamingUrl(itemData), Tile.type.LIVE_CHANNEL);
            var domElement = tile.createDOMElement();
            this.channels.push(domElement);
            liveStrip.appendChild(domElement);
        }

        callback();
    }.bind(this));


};



ChannelManager.prototype.changeChannel = function (steps) {
    app.eventHandler.onChannelClick(this.channels[this.currentChannel + steps]);
}

ChannelManager.prototype.setCurrentChannel = function (title) {
    this.currentChannel = this.channels.findIndex(function(channel) {
        if(channel.dataset.title == title) return true;
    });

}
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