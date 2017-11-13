ChannelManager = function () {
	
};

ChannelManager.prototype.channels = [];

ChannelManager.prototype.initChannels = function() {
    this.fetchChannels(function() {
        this.prepareLiveChannelsStrip();
    }.bind(this));

};

ChannelManager.prototype.fetchChannels = function (callback) {
	
	var url = 'https://www.dr.dk/mu/bundle?BundleType=%22Channel%22&DrChannel=true&ChannelType=TV&WebChannel=false';
	
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

            var assets = itemData['Assets'];
            var asset = assets.find(function(a) {
                return a['Name'].indexOf("PAUSEBILLEDE") === -1;
            });
            asset = asset || assets[0];

            this.channels.push(new Channel(
                itemData['Slug'],
                itemData['Title'],
                asset['Uri'],
                itemData['StreamingServers'][1]
            ));
        }.bind(this));

        callback();

    }.bind(this));
};

ChannelManager.prototype.prepareLiveChannelsStrip = function () {

    var liveChildren = document.getElementById('live-children');

    this.channels.forEach(function(channel) {

        var quality = channel.streamingServer['Qualities'][0];
        var streams = quality['Streams'][0];

        var tile = new Tile(channel.logoUrl, channel.title, channel.streamingServer['Server'] + '/' + streams['Stream']);

        liveChildren.appendChild(tile.createDOMElement());

    });


};