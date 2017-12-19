if (!Array.prototype.find) {
    /**
     * @template T
     * @this Array<T>
     * @param {function(T, number, !Array<T>) : boolean} predicate
     * @return {?T}
     */
    Array.prototype.find = function(predicate) {
        var length = this.length,
            value;

        for (var i = 0; i < length; i++) {
            value = this[i];
            if (predicate(value, i, this)) {
                return value;
            }
        }
        return null;
    };
}

if (!Array.prototype.findIndex) {
    /**
     * @template T
     * @this Array<T>
     * @param {function(T, number, !Array<T>) : boolean} predicate
     * @return {number}
     */
    Array.prototype.findIndex = function(predicate) {
        var length = this.length,
            value;

        for (var i = 0; i < length; i++) {
            value = this[i];
            if (predicate(value, i, this)) {
                return i;
            }
        }
        return -1;
    };
}


if (!Array.from) {
    /**
     * @param {*} collection
     * @return {Array}
     */
    Array.from = function(collection) {
        return [].slice.call(collection);
    }
}