var Tile = function(imgUrl, title, videoUrl) {
    this.imgUrl = imgUrl;
    this.title = title;
    this.videoUrl = videoUrl;
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

    itemElement.dataset.videoUrl = this.videoUrl;

    itemElement.addEventListener('mouseup', function(e) {
        if (app.scrollingControl.totalDx < 5) {
            app.videoPlayer.play(itemElement.dataset.videoUrl);
        }
        e.preventDefault();
    }.bind(this));

    itemElement.addEventListener('touchend', function(e) {
        if (app.scrollingControl.totalDx < 5) {
            app.videoPlayer.play(itemElement.dataset.videoUrl);
        }
        e.preventDefault();
    }.bind(this));

    itemElement.appendChild(imgElement);
    itemElement.appendChild(titleElement);

    return itemElement;

};