var Tile = function(imgUrl, title, videoUrl, type) {
    this.imgUrl = imgUrl;
    this.title = title;
    this.videoUrl = videoUrl;
    this.type = type || this.type.LIVE_CHANNEL;
};

Tile.type = {
    LIVE_CHANNEL : 1,
    SERIES : 2,
    EPISODE : 3,
    PROGRAM_CARD : 4
};

Tile.prototype.createDOMElement = function() {
    var imgElement = document.createElement('img');
    var titleElement = document.createElement('div');
    var itemElement = document.createElement('div');

    itemElement.classList.add('item');
    imgElement.classList.add('img');
    titleElement.classList.add('title', 'text', 'font-size-small');

    titleElement.innerText = this.title;
    imgElement.src = this.imgUrl;
    itemElement.dataset.type = this.type;
    itemElement.dataset.title = this.title;

    itemElement.appendChild(imgElement);
    itemElement.appendChild(titleElement);

    switch (this.type) {
        case Tile.type.LIVE_CHANNEL:
            itemElement.dataset.videoUrl = this.videoUrl;
            itemElement.addEventListener('click', function() {
                app.eventHandler.onChannelClick(itemElement);
            });
            break;
        case Tile.type.PROGRAM_CARD:
            itemElement.dataset.videoResource = this.videoUrl;
            itemElement.addEventListener('click', function() {
                app.eventHandler.onProgramCardClick(itemElement);
            });
    }


    return itemElement;

};