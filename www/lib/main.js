var windowLoaded = function() {
    window.app = {
        channelMananager: new ChannelManager(),
        seriesManager: new SeriesManager(),
        videoPlayer: new VideoPlayer(),
        dPadNavigation: new DPadNavigation(),
        scrollingControl: new ScrollingControl(),
        fullscreenApi: new FullscreenApi(),
        resizer: new Resizer(),
        beamMedia: new BeamMedia(),
        state : 'default',
        states : {
            DEFAULT : 'default',
            PLAYING_LIVE_CHANNEL : 'playing_live_channel',
            PLAYING_EPISODE : 'playing_episode',
            SHOWING_SERIES_PAGE : 'showing_series_page',
        }
    };



    app.channelMananager.initChannels();
    app.seriesManager.fetchSeries();

    app.resizer.onResize();
};

window.addEventListener('load', windowLoaded);

