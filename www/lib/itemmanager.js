/**
 * @constructor
 */
ItemManager = function() {

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
            var tile = new Tile(itemData['PrimaryImageUri'], itemData['Title'], itemData['PrimaryAsset']['Uri'], Tile.type.PROGRAM_CARD);
            mostviewedStrip.appendChild(tile.createDOMElement());
        }

        callback();
    }.bind(this));
};


