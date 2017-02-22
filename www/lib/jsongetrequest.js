/**
 * @constructor
 * @param {string} path
 */
var JsonGetRequest = function(path) {

    /**
     * @type {XMLHttpRequest}
     */
    this.xmlHttp = new XMLHttpRequest();

    /**
     * @type {string}
     */
    this.path = path;

    /**
     * @type {?}
     * @private
     */
    this.data_ = null;
};

/**
 * @param {function(?Error, JsonGetRequest)} callback
 */
JsonGetRequest.prototype.prepare = function(callback) {
    this.xmlHttp.addEventListener('load', function() {
        if (this.xmlHttp.readyState === 4) {
            if (this.xmlHttp.status === 200) {
                try {
                    this.data_ = JSON.parse(this.xmlHttp.responseText);
                    callback(null, this);
                } catch (e) {
                    callback(e, this)
                }
            } else {
                callback(new Error('Request failed Status code: ' + this.xmlHttp.status), this);
            }
        }
    }.bind(this));

    this.xmlHttp.open('GET', this.path);
    this.xmlHttp.send();
};

/**
 * @return {?}
 */
JsonGetRequest.prototype.getData = function() {
    if (this.data_ === null) {
        throw new Error('Data not yet prepared');
    }
    return this.data_;
};

/**
 * @param {string} path
 * @param {function(?Error, JsonGetRequest)} callback
 */
JsonGetRequest.prepare = function(path, callback) {
    var jsonGetRequest = new JsonGetRequest(path);
    jsonGetRequest.prepare(callback);
};