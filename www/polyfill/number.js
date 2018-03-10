if (!Number.prototype.clamp) {

    /**
     * @param {number} min
     * @param {number} max
     * @return {number}
     */
    Number.prototype.clamp = function(min, max) {
        return Math.min(Math.max(this, min), max);
    };
}

