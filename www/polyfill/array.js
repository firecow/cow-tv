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
