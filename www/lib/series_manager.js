var SeriesManager = function () {

};

SeriesManager.prototype.series = [];


SeriesManager.prototype.fetchSeries = function(callback) {

    var url = "https://www.dr.dk/mu/bundle?ChannelType=%22TV%22&BundleType=%22Series%22&PresentationSeries=$exists(true)&Assets=$exists(true)";

    JsonGetRequest.prepare(url, function(err, request) {

        var itemDatas;

        if (err) {
            throw err;
        }

        itemDatas = request.getData()['Data'];

        itemDatas.forEach(function(item) {
            console.log(item);

            this.series.push(new Serie(item['Title']));

        }.bind(this));
    }.bind(this));

};

