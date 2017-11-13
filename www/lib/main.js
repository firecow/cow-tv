var windowLoaded = function() {
    window.app = {
        channelMananager: new ChannelManager(),
        seriesManager: new SeriesManager(),
        videoPlayer: new VideoPlayer(),
        dPadNavigation: new DPadNavigation(),
        scrollingControl: new ScrollingControl(),
        fullscreenApi: new FullscreenApi(),
        resizer: new Resizer(),
        beamMedia: new BeamMedia()

    };

    app.channelMananager.initChannels();
    app.seriesManager.fetchSeries();

    app.resizer.onResize();
};

window.addEventListener('load', windowLoaded);

