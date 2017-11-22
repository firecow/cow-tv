/**
 * @constructor
 */
Device = function() {

};

/**
 * @return {boolean}
 */
Device.prototype.isCordova = function() {
    return !!window.cordova;
};

/**
 * @return {boolean}
 */
Device.prototype.isWebOS = function() {
    return !!window.webOS;
};
