if (!String.prototype.capitalize) {
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
}

if (!String.prototype.toTitleCase) {
    String.prototype.toTitleCase = function() {
        return this.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
}

